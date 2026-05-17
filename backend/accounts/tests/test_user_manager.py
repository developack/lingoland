from rest_framework.test import APITestCase
from accounts.models import User


class TestUserManager(APITestCase):

    def test_create_user_with_empty_email(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_user(username='test', email='', password='1234')
        self.assertEqual(User.objects.count(), 0)
        self.assertIn('User must have an email address', str(context.exception))

    def test_create_user_with_empty_username(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_user(username='', email='test@gmail.com', password='1234')
        self.assertEqual(User.objects.count(), 0)
        self.assertIn('User must have an username', str(context.exception))

    def test_create_user_successfully(self):
        User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.assertEqual(User.objects.count(), 1)

    def test_user_password_is_hashed(self):
        user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.assertEqual(User.objects.count(), 1)
        self.assertNotEqual(user.password, '1234')
        self.assertTrue(user.check_password('1234'))

    # ============================================================ #

    def test_create_superuser_successfully(self):
        user = User.objects.create_superuser(username='test', email='test@gmail.com', password='1234')
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(user.is_superuser, True)
        self.assertEqual(user.is_staff, True)

    def test_create_superuser_with_is_staff_false_raises_error(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_superuser(username='test', email='test@gmail.com', password='1234', is_staff=False)
        self.assertEqual(User.objects.count(), 0)
        self.assertIn('Superuser must have is_staff=True.', str(context.exception))

    def test_create_superuser_with_is_superuser_false_raises_error(self):
        with self.assertRaises(ValueError) as context:
            User.objects.create_superuser(username='test', email='test@gmail.com', password='1234', is_superuser=False)
        self.assertEqual(User.objects.count(), 0)
        self.assertIn('Superuser must have is_superuser=True.', str(context.exception))