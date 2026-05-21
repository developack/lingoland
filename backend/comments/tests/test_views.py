from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from articles.models import Article
from comments.models import Comment
from courses.models import Course, Lesson, Enrollment


class TestCommentCreateView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.other_user = User.objects.create_user(email='new@gmail.com', username='new', password='1234')
        cls.article = Article.objects.create(user=cls.user, title='article1')
        cls.course = Course.objects.create(user=cls.user, title='django')
        cls.lesson = Lesson.objects.create(course=cls.course, title='lesson1')
        Enrollment.objects.create(user=cls.user, course=cls.course)
        cls.comment_create_url = reverse('comments:comment-create')
        cls.lesson_comment_data = {"type": "Lesson", "slug": "lesson1", "text": "this is a test comment"}
        cls.article_comment_data = {"type": "Article", "slug": "article1", "text": "this is a test comment"}

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_add_comment(self):
        self.authenticate()
        response = self.client.post(self.comment_create_url, data=self.article_comment_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)

    def test_unauthenticated_user_cannot_add_comment(self):
        response = self.client.post(self.comment_create_url, data=self.article_comment_data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Comment.objects.count(), 0)

    def test_enrolled_user_can_add_comment_in_course_steps(self):
        self.authenticate()
        response = self.client.post(self.comment_create_url, data=self.lesson_comment_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Comment.objects.count(), 1)

    def test_not_enrolled_user_cannot_add_comment_in_course_steps(self):
        self.authenticate(user=self.other_user)
        response = self.client.post(self.comment_create_url, data=self.lesson_comment_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Comment.objects.count(), 0)

    def test_add_comment_when_user_send_invalid_data(self):
        self.authenticate()
        response = self.client.post(self.comment_create_url, data={**self.lesson_comment_data, 'type': 'invalid-type'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Comment.objects.count(), 0)

# ============================================================ #

class TestMyCommentsListView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.my_comments_url = reverse('comments:my-comments')

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_get_own_comments(self):
        self.authenticate()
        response = self.client.get(self.my_comments_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_own_comments(self):
        response = self.client.get(self.my_comments_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


