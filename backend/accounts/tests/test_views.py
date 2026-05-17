from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from accounts.models import User


class TestUserViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')

    def test_user_register_successfully(self):
        data = {'username': 'kevin', 'email': 'kevin@gmail.com', 'password': '1234', 'confirm_password': '1234'}
        response = self.client.post(reverse('accounts:register'), data=data)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_register_fails_when_send_invalid_data(self):
        data = {'username': 'test', 'email': 'test@gmail.com', 'password': '1234', 'confirm_password': '1234'}
        response = self.client.post(reverse('accounts:register'), data=data)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    # ============================================================ #

    def test_user_login_successfully(self):
        data = {'email': 'test@gmail.com', 'password': '1234'}
        response = self.client.post(reverse('accounts:login'), data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Token.objects.count(), 1)

    def test_user_login_fails_when_send_invalid_data(self):
        data = {'email': 'test@gmail.com', 'password': 'wrong-password'}
        response = self.client.post(reverse('accounts:login'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Token.objects.count(), 0)

    # ============================================================ #

    def test_authenticated_user_can_get_own_profile_successfully(self):
        self.client.force_authenticate(self.user)
        response = self.client.get(reverse('accounts:user-profile'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.username, response.data.get('username'))

    def test_unauthenticated_user_cannot_get_own_profile(self):
        response = self.client.get(reverse('accounts:user-profile'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_authenticated_user_can_update_own_profile_successfully(self):
        self.client.force_authenticate(self.user)
        data = {'first_name': 'john', 'last_name': 'doe'}
        response = self.client.patch(reverse('accounts:user-profile'), data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('first_name'), data['first_name'])

    def test_authenticated_user_cannot_update_own_profile_when_send_invalid_data(self):
        User.objects.create_user(username='jack', email='jack@gmail.com', password='<PASSWORD>')
        self.client.force_authenticate(self.user)
        data = {'username': 'jack'}
        response = self.client.patch(reverse('accounts:user-profile'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthenticated_user_cannot_update_own_profile(self):
        data = {'first_name': 'jack'}
        response = self.client.patch(reverse('accounts:user-profile'), data=data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
