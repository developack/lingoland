from types import SimpleNamespace
from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from accounts.models import User
from articles.models import Article
from comments.models import Comment
from comments.serializers import CommentCreateSerializer
from courses.models import Course, Lesson, Topic, Enrollment


class TestCommentCreateSerializer(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.article_comment_data = {"type": "Article", "slug": "article1", "text": "test comment"}
        cls.lesson_comment_data = {'type': 'Lesson', 'slug': 'lesson1', 'text': 'test comment'}
        cls.topic_comment_data = {'type': 'Topic', 'slug': 'topic1', 'text': 'test comment'}
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.other_user = User.objects.create_user(email='new@gmail.com', username='new', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')
        cls.lesson = Lesson.objects.create(course=cls.course, title='lesson1')
        cls.topic = Topic.objects.create(lesson=cls.lesson, title='topic1')
        cls.article = Article.objects.create(user=cls.user, title='article1')
        Enrollment.objects.create(user=cls.user, course=cls.course)

    def test_create_comment_serializer_fails_when_content_object_does_not_exist(self):
        data = {**self.article_comment_data, 'slug': 'invalid-slug'}
        serializer = CommentCreateSerializer(data=data, context={'request': SimpleNamespace(user=self.user)})
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Content object does not exist', str(context.exception))

    def test_not_enrolled_user_cannot_comment_on_lesson(self):
        serializer = CommentCreateSerializer(
            data=self.lesson_comment_data, context={'request': SimpleNamespace(user=self.other_user)})
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Only enroll users can submit comments on lessons or topics.', str(context.exception))

    def test_enrolled_user_can_comment_on_lesson(self):
        serializer = CommentCreateSerializer(data=self.lesson_comment_data, context={'request': SimpleNamespace(user=self.user)})
        serializer.is_valid(raise_exception=True)
        self.assertTrue(serializer.validated_data)

    def test_not_enrolled_user_cannot_comment_on_topic(self):
        serializer = CommentCreateSerializer(
            data=self.topic_comment_data, context={'request': SimpleNamespace(user=self.other_user)})
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('Only enroll users can submit comments on lessons or topics.', str(context.exception))

    def test_enrolled_user_can_comment_on_topic(self):
        serializer = CommentCreateSerializer(data=self.topic_comment_data, context={'request': SimpleNamespace(user=self.user)})
        serializer.is_valid(raise_exception=True)
        self.assertTrue(serializer.validated_data)

    def test_user_can_comment_on_article_without_enrollment(self):
        serializer = CommentCreateSerializer(data=self.article_comment_data, context={'request': SimpleNamespace(user=self.user)})
        serializer.is_valid(raise_exception=True)
        self.assertTrue(serializer.validated_data)

    def test_create_comment_serializer_creates_comment_successfully(self):
        serializer = CommentCreateSerializer(data=self.article_comment_data, context={'request': SimpleNamespace(user=self.user)})
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        self.assertEqual(comment.user, self.user)
        self.assertEqual(Comment.objects.count(), 1)