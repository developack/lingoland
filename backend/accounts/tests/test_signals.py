from rest_framework.test import APITestCase
from accounts.models import User, UserProfile


class TestUserSignals(APITestCase):

    def test_user_profile_created_on_user_creation(self):
        user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        self.assertEqual(UserProfile.objects.filter(user=user).count(), 1)