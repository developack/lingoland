from accounts.models import User
from orders.models import Order
from rest_framework.test import APITestCase
from courses.models import Course, Enrollment
from orders.services.order import OrderService
from orders.services.payment import PaymentService


class TestPayment(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django master')

    def test_payment_fails_when_order_not_found(self):
        Order.objects.filter(user=self.user).delete()
        with self.assertRaises(ValueError) as context:
            PaymentService.payment(self.user)
        self.assertEqual(str(context.exception), 'Order does not exist')

    def test_payment_returns_order_when_order_is_already_completed(self):
        order = Order.objects.create(user=self.user, status='Completed')
        result_order = PaymentService.payment(self.user)
        self.assertEqual(order, result_order)

    def test_payment_fails_when_order_status_is_not_pending(self):
        Order.objects.create(user=self.user, status='Failed')
        with self.assertRaises(ValueError) as context:
            PaymentService.payment(self.user)
        self.assertEqual(str(context.exception), 'Order is not payable')

    def test_payment_fails_when_order_is_empty(self):
        Order.objects.create(user=self.user, status='Pending')
        with self.assertRaises(ValueError) as context:
            PaymentService.payment(self.user)
        self.assertEqual(str(context.exception), 'There is no item in your order')

    def test_payment_creates_enrollments_successfully(self):
        OrderService.create_order(self.user, [self.course.slug])
        PaymentService.payment(self.user)
        self.assertEqual(Enrollment.objects.filter(user=self.user, course=self.course).count(), 1)

    def test_payment_complete_successfully(self):
        OrderService.create_order(self.user, [self.course.slug])
        order = PaymentService.payment(self.user)
        self.assertEqual(order.status, 'Completed')
        self.assertEqual(Enrollment.objects.filter(user=self.user, course=self.course).count(), 1)