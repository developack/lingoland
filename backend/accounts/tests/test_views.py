from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token
from rest_framework import status
from accounts.models import User


class TestUserRegisterView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.email = 'test@gmail.com'
        cls.username = 'test'
        cls.password = '1234'
        cls.register_url = reverse('accounts:register')
        cls.user = User.objects.create_user(username=cls.username, email=cls.email, password=cls.password)
        cls.data = {'username': 'kevin', 'email': 'kevin@gmail.com', 'password': cls.password, 'confirm_password': cls.password}

    def setUp(self):
        self.users_count = User.objects.count()

    def test_user_register_successfully(self):
        response = self.client.post(self.register_url, data=self.data)
        self.assertEqual(User.objects.count(), self.users_count + 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_register_fails_when_send_invalid_data(self):
        data = {**self.data, 'username': self.username, 'email': self.email}
        response = self.client.post(self.register_url, data=data)
        self.assertEqual(User.objects.count(), self.users_count)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

# ============================================================ #

class TestUserLoginView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.email = 'test@gmail.com'
        cls.username = 'test'
        cls.password = '1234'
        cls.login_url = reverse('accounts:login')
        cls.user = User.objects.create_user(username=cls.username, email=cls.email, password=cls.password)

    def setUp(self):
        self.users_count = User.objects.count()
        self.tokens_count = Token.objects.count()

    def test_user_login_successfully(self):
        data = {'email': self.email, 'password': self.password}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Token.objects.count(), self.tokens_count + 1)

    def test_user_login_fails_when_send_invalid_data(self):
        data = {'email': self.email, 'password': 'wrong-password'}
        response = self.client.post(self.login_url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Token.objects.count(), self.tokens_count)

# ============================================================ #

class TestUserProfileView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.email = 'test@gmail.com'
        cls.username = 'test'
        cls.password = '1234'
        cls.another_email = 'jack@gmail.com'
        cls.another_username = 'jack'
        cls.profile_url = reverse('accounts:user-profile')
        cls.valid_profile_data = {'first_name': 'john', 'last_name': 'doe'}
        cls.user = User.objects.create_user(username=cls.username, email=cls.email, password=cls.password)

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_get_own_profile_successfully(self):
        self.authenticate()
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.user.username, response.data.get('username'))

    def test_authenticated_user_can_update_own_profile_successfully(self):
        self.authenticate()
        response = self.client.patch(self.profile_url, data=self.valid_profile_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, self.valid_profile_data['first_name'])

    def test_authenticated_user_cannot_update_own_profile_when_send_invalid_data(self):
        User.objects.create_user(username=self.another_username, email=self.another_email, password=self.password)
        self.authenticate()
        response = self.client.patch(self.profile_url, data={'username': self.another_username}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthenticated_user_cannot_update_own_profile(self):
        response = self.client.patch(self.profile_url, data={'username': self.another_username}, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_unauthenticated_user_cannot_get_own_profile(self):
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)