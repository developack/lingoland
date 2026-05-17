from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from accounts.models import User
from accounts.serializers import UserRegisterSerializer
from accounts.serializers import UserLoginSerializer
from accounts.serializers import UserDetailSerializer


class TestUserRegistrationSerializer(APITestCase):

    def test_user_can_registration_successfully(self):
        data = {'email': 'kevin@gmail.com', 'username': 'kevin', 'password': '1234', 'confirm_password': '1234'}
        serializer = UserRegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.first().email, data['email'])

    def test_user_registration_fails_when_passwords_doesnt_match(self):
        data = {'email': 'kevin@gmail.com', 'username': 'kevin', 'password': '1234', 'confirm_password': '123'}
        serializer = UserRegisterSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Passwords do not match', str(context.exception))
        self.assertEqual(User.objects.count(), 0)

    def test_user_registration_fails_when_email_already_exist(self):
        User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        data = {'email': 'test@gmail.com', 'username': 'kevin', 'password': '1234', 'confirm_password': '123'}
        serializer = UserRegisterSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Email already exists', str(context.exception))
        self.assertEqual(User.objects.count(), 1)

    def test_user_registration_fails_when_username_already_exist(self):
        User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        data = {'email': 'kevin@gmail.com', 'username': 'test', 'password': '1234', 'confirm_password': '123'}
        serializer = UserRegisterSerializer(data=data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Username already exists', str(context.exception))
        self.assertEqual(User.objects.count(), 1)

# ============================================================ #

class TestUserLoginSerializer(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')

    def test_user_can_login_successfully(self):
        serializer = UserLoginSerializer(data={'email': 'test@gmail.com', 'password': '1234'})
        serializer.is_valid(raise_exception=True)
        self.assertEqual(serializer.validated_data['user'], self.user)

    def test_user_login_fails_when_credentials_does_not_match(self):
        serializer = UserLoginSerializer(data={'email': 'test@gmail.com', 'password': '123456'})
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Invalid credentials', str(context.exception))

# ============================================================ #

class TestUserDetailSerializer(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')

    def test_update_user_detail_successfully(self):
        data = {'user_profile': {'full_name': 'John Doe'}}
        serializer = UserDetailSerializer(instance=self.user, data=data, partial=True)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        user = serializer.save()
        self.assertEqual(user.user_profile.full_name, data['user_profile']['full_name'])

    def test_update_user_detail_without_user_profile(self):
        data = {'first_name': 'John', 'last_name': 'Doe'}
        serializer = UserDetailSerializer(instance=self.user, data=data, partial=True)
        self.assertTrue(serializer.is_valid(raise_exception=True))
        user = serializer.save()
        self.assertEqual(user.first_name, 'John')
        self.assertEqual(user.last_name, 'Doe')