from rest_framework.test import APITestCase
from accounts.models import User


class TestUserManager(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.email = 'test@gmail.com'
        cls.username = 'test'
        cls.password = '1234'

    def setUp(self):
        self.users_count = User.objects.count()

    def test_create_user_with_empty_email(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_user(username=self.username, email='', password=self.password)
        self.assertEqual(User.objects.count(), self.users_count)
        self.assertIn('User must have an email address', str(context.exception))

    def test_create_user_with_empty_username(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_user(username='', email=self.email, password=self.password)
        self.assertEqual(User.objects.count(), self.users_count)
        self.assertIn('User must have an username', str(context.exception))

    def test_create_user_successfully(self):
        User.objects.create_user(username=self.username, email=self.email, password=self.password)
        self.assertEqual(User.objects.count(), self.users_count + 1)
        self.assertTrue(User.objects.filter(email=self.email).exists())

    def test_user_password_is_hashed(self):
        user = User.objects.create_user(username=self.username, email=self.email, password=self.password)
        self.assertEqual(User.objects.count(), self.users_count + 1)
        self.assertNotEqual(user.password, self.password)
        self.assertTrue(user.check_password(self.password))

    # ============================================================ #

    def test_create_superuser_successfully(self):
        user = User.objects.create_superuser(username=self.username, email=self.email, password=self.password)
        self.assertEqual(User.objects.count(), self.users_count + 1)
        self.assertEqual(user.is_superuser, True)
        self.assertEqual(user.is_staff, True)

    def test_create_superuser_with_is_staff_false_raises_error(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_superuser(username=self.username, email=self.email, password=self.password, is_staff=False)
        self.assertEqual(User.objects.count(), self.users_count)
        self.assertIn('Superuser must have is_staff=True.', str(context.exception))

    def test_create_superuser_with_is_superuser_false_raises_error(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_superuser(username=self.username, email=self.email, password=self.password, is_superuser=False)
        self.assertEqual(User.objects.count(), self.users_count)
        self.assertIn('Superuser must have is_superuser=True.', str(context.exception))