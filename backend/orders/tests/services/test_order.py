from accounts.models import User
from unittest.mock import patch
from django.db import IntegrityError
from orders.models import Order, OrderItem
from rest_framework.test import APITestCase
from courses.models import Course, Enrollment
from orders.services.order import OrderService


class TestOrder(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.course = Course.objects.create(user=self.user, title='django master')

    def test_create_order_fails_when_courses_slug_is_empty(self):
        with self.assertRaisesMessage(ValueError, 'Courses slug cannot be empty'):
            OrderService.create_order(self.user, [])

    def test_create_order_fails_when_course_not_found(self):
        courses_slug = ['reactjs-master']
        with self.assertRaises(ValueError) as context:
            OrderService.create_order(self.user, courses_slug)
        self.assertIn('These courses do not exist', str(context.exception))

    def test_create_order_fails_when_user_already_enrolled(self):
        Enrollment.objects.create(user=self.user, course=self.course)
        with self.assertRaises(ValueError) as context:
            OrderService.create_order(self.user, [self.course.slug])
        self.assertIn('You are already enrolled in', str(context.exception))

    def test_create_order_fails_with_duplicate_order_items(self):
        OrderService.create_order(self.user, [self.course.slug])
        with self.assertRaises(ValueError) as context:
            OrderService.create_order(self.user, [self.course.slug])
        self.assertIn('These courses already exist in your order', str(context.exception))

    def test_create_order_successfully(self):
        order = OrderService.create_order(self.user, [self.course.slug])
        order_item = OrderItem.objects.filter(order=order).first()
        self.assertEqual(order_item.course, self.course)
        self.assertEqual(order.status, 'Pending')
        self.assertEqual(order.user, self.user)
        self.assertEqual(order.total_price, self.course.price)

    @patch('orders.services.order.OrderItem.objects.bulk_create')
    def test_order_creation_is_atomic(self, mock_bulk_create):
        mock_bulk_create.side_effect = IntegrityError('Database error')
        with self.assertRaises(IntegrityError):
            OrderService.create_order(self.user, [self.course.slug])
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(OrderItem.objects.count(), 0)