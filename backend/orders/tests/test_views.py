from accounts.models import User
from orders.models import Order
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from courses.models import Course, Enrollment


class TestOrderViews(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.course = Course.objects.create(user=self.user, title='django master')

    def test_authenticated_user_can_get_orders(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('orders:my-orders'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_orders(self):
        response = self.client.get(reverse('orders:my-orders'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # ============================================================ #

    def test_user_order_not_found(self):
        self.client.force_authenticate(user=self.user)
        order_id = 'b25494a1-928f-46a2-85c9-3bf1e56de8ce'
        response = self.client.get(reverse('orders:order-detail', args=(order_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_authenticated_user_can_get_own_order(self):
        self.client.force_authenticate(user=self.user)
        order = Order.objects.create(user=self.user, status='Pending')
        response = self.client.get(reverse('orders:order-detail', args=(order.id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_order(self):
        order = Order.objects.create(user=self.user, status='Pending')
        response = self.client.get(reverse('orders:order-detail', args=(order.id,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_cannot_get_other_users_order(self):
        order = Order.objects.create(user=self.user, status='Pending')
        new_user = User.objects.create_user(email='new-tu@gmail.com', username='new-tu', password='1234')
        self.client.force_authenticate(user=new_user)
        response = self.client.get(reverse('orders:order-detail', args=(order.id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================ #

    def test_authenticated_user_can_create_order(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('orders:orders'), data={'courses': [self.course.slug]}, format='json')
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_unauthenticated_user_cannot_create_order(self):
        response = self.client.post(reverse('orders:orders'), data={'courses': [self.course.slug]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_order_with_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('orders:orders'), data={'courses': []}, format='json')
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_order_with_nonexistent_course(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('orders:orders'), data={'courses': ['reactjs-course']}, format='json')
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ============================================================ #

    def test_authenticated_user_can_pay_order(self):
        self.client.force_authenticate(user=self.user)
        order_create = self.client.post(reverse('orders:orders'), data={'courses': ['django-master']}, format='json')
        response = self.client.get(reverse('orders:payment'))
        self.assertEqual(order_create.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Enrollment.objects.count(), 1)

    def test_unauthenticated_user_cannot_pay_order(self):
        order_create = self.client.post(reverse('orders:orders'), data={'courses': ['django-master']}, format='json')
        response = self.client.get(reverse('orders:payment'))
        self.assertEqual(order_create.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Enrollment.objects.count(), 0)

    def test_pay_order_with_nonexistent_order(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('orders:payment'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Enrollment.objects.count(), 0)