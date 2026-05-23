from accounts.models import User
from orders.models import Order
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from courses.models import Course, Enrollment


class TestMyOrdersListView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.my_orders_url = reverse('orders:my-orders')
        cls.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_get_orders(self):
        self.authenticate()
        response = self.client.get(self.my_orders_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_orders(self):
        response = self.client.get(self.my_orders_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# ============================================================ #

class TestOrderDetailView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.order_detail_url = 'orders:order-detail'
        cls.order_id = 'b25494a1-928f-46a2-85c9-3bf1e56de8ce'
        cls.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        cls.other_user = User.objects.create_user(username='other', email='other@gmail.com', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_user_order_not_found(self):
        self.authenticate()
        order_id = self.order_id
        response = self.client.get(reverse(self.order_detail_url, args=(order_id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_authenticated_user_can_get_own_order(self):
        self.authenticate()
        order = Order.objects.create(user=self.user, status='Pending')
        response = self.client.get(reverse(self.order_detail_url, args=(order.id,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_order(self):
        order = Order.objects.create(user=self.user, status='Pending')
        response = self.client.get(reverse(self.order_detail_url, args=(order.id,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_user_cannot_get_other_users_order(self):
        order = Order.objects.create(user=self.user, status='Pending')
        self.authenticate(user=self.other_user)
        response = self.client.get(reverse(self.order_detail_url, args=(order.id,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# ============================================================ #

class TestOrderCreateView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.orders_url = reverse('orders:orders')
        cls.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_create_order(self):
        self.authenticate()
        response = self.client.post(self.orders_url, data={'courses': [self.course.slug]}, format='json')
        self.assertEqual(Order.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_unauthenticated_user_cannot_create_order(self):
        response = self.client.post(self.orders_url, data={'courses': [self.course.slug]}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_order_with_invalid_data(self):
        self.authenticate()
        response = self.client.post(self.orders_url, data={'courses': []}, format='json')
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_order_with_nonexistent_course(self):
        self.authenticate()
        response = self.client.post(self.orders_url, data={'courses': ['invalid-slug']}, format='json')
        self.assertEqual(Order.objects.count(), 0)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# ============================================================ #

class TestPaymentView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.orders_url = reverse('orders:orders')
        cls.payment_url = reverse('orders:payment')
        cls.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')

    def setUp(self):
        self.order = self.client.post(self.orders_url, data={'courses': [self.course.slug]}, format='json')

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_pay_order(self):
        self.authenticate()
        response = self.client.get(self.payment_url)
        self.assertEqual(self.order.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Enrollment.objects.count(), 1)

    def test_unauthenticated_user_cannot_pay_order(self):
        response = self.client.get(self.payment_url)
        self.assertEqual(self.order.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Enrollment.objects.count(), 0)

    def test_pay_order_with_nonexistent_order(self):
        self.authenticate()
        response = self.client.get(self.payment_url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Enrollment.objects.count(), 0)