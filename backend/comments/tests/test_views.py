from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from articles.models import Article
from comments.models import Comment
from courses.models import Course, Lesson, Enrollment


class TestCommentViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        self.other_user = User.objects.create_user(email='new@gmail.com', username='new', password='1234')
        self.article = Article.objects.create(user=self.user, title='article1')
        self.course = Course.objects.create(user=self.user, title='django')
        self.lesson = Lesson.objects.create(course=self.course, title='lesson1')
        Enrollment.objects.create(user=self.user, course=self.course)
        self.data = {
            "type": "Article",
            "slug": "article1",
            "text": "this is a test comment"
        }

    def test_authenticated_user_can_add_comment(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('comments:comment-create'), data=self.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)

    def test_unauthenticated_user_cannot_add_comment(self):
        response = self.client.post(reverse('comments:comment-create'), data=self.data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Comment.objects.count(), 0)

    def test_enrolled_user_can_add_comment_in_course_steps(self):
        data = {
            "type": "Lesson",
            "slug": "lesson1",
            "text": "this is a test comment"
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('comments:comment-create'), data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)

    def test_not_enrolled_user_cannot_add_comment_in_course_steps(self):
        data = {
            "type": "Lesson",
            "slug": "lesson1",
            "text": "this is a test comment"
        }
        self.client.force_authenticate(user=self.other_user)
        response = self.client.post(reverse('comments:comment-create'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Comment.objects.count(), 0)

    def test_add_comment_when_user_send_invalid_data(self):
        data = {
            "type": "accounts",
            "slug": "lesson1",
            "text": "this is a test comment"
        }
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('comments:comment-create'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Comment.objects.count(), 0)

    # ============================================================ #

    def test_authenticated_user_can_get_own_comments(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('comments:my-comments'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_own_comments(self):
        response = self.client.get(reverse('comments:my-comments'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


