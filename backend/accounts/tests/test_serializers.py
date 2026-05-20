from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from accounts.models import User
from accounts.serializers import UserRegisterSerializer
from accounts.serializers import UserLoginSerializer
from accounts.serializers import UserDetailSerializer


class TestUserRegistrationSerializer(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.valid_data = {'email': 'kevin@gmail.com', 'username': 'kevin', 'password': '1234', 'confirm_password': '1234'}
        cls.wrong_email_data = {**cls.valid_data, 'email': 'test@gmail.com'}
        cls.wrong_username_data = {**cls.valid_data, 'username': 'test'}
        cls.wrong_password_data = {**cls.valid_data, 'confirm_password': '123'}

    def setUp(self):
        self.users_count = User.objects.count()

    def test_user_can_registration_successfully(self):
        serializer = UserRegisterSerializer(data=self.valid_data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        self.assertEqual(User.objects.count(), self.users_count + 1)
        self.assertTrue(User.objects.filter(email=self.valid_data['email']).exists())

    def test_user_registration_fails_when_passwords_doesnt_match(self):
        serializer = UserRegisterSerializer(data=self.wrong_password_data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Passwords do not match', str(context.exception))
        self.assertEqual(User.objects.count(), self.users_count)

    def test_user_registration_fails_when_email_already_exist(self):
        serializer = UserRegisterSerializer(data=self.wrong_email_data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Email already exists', str(context.exception))
        self.assertEqual(User.objects.count(), self.users_count)

    def test_user_registration_fails_when_username_already_exist(self):
        serializer = UserRegisterSerializer(data=self.wrong_username_data)
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Username already exists', str(context.exception))
        self.assertEqual(User.objects.count(), self.users_count)

# ============================================================ #

class TestUserLoginSerializer(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.valid_data = {'email': 'test@gmail.com', 'password': '1234'}

    def test_user_can_login_successfully(self):
        serializer = UserLoginSerializer(data=self.valid_data)
        serializer.is_valid(raise_exception=True)
        self.assertEqual(serializer.validated_data['user'], self.user)

    def test_user_login_fails_when_credentials_does_not_match(self):
        serializer = UserLoginSerializer(data={**self.valid_data, 'password': '123456'})
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Invalid credentials', str(context.exception))

# ============================================================ #

class TestUserDetailSerializer(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.valid_data = {'email': 'test@gmail.com', 'password': '1234'}

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
        self.assertEqual(user.first_name, data['first_name'])
        self.assertEqual(user.last_name, data['last_name'])