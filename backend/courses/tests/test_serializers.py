from types import SimpleNamespace
from rest_framework.test import APITestCase
from accounts.models import User
from courses.models import Course, Lesson, Enrollment, LessonActivity
from courses.serializers import CourseDetailSerializer, LessonDetailSerializer


class TestCourseSerializers(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        self.course = Course.objects.create(user=self.user, title='django')
        self.lesson = Lesson.objects.create(user=self.user, course=self.course, title='lesson1')

    def test_get_is_enrolled_returns_true_for_enrolled_user(self):
        self.client.force_authenticate(user=self.user)
        Enrollment.objects.create(user=self.user, course=self.course)
        serializer = CourseDetailSerializer(instance=self.course, context={'request': SimpleNamespace(user=self.user)})
        self.assertTrue(serializer.get_is_enrolled(self.course))

    def test_get_is_enrolled_returns_false_for_not_enrolled_user(self):
        self.client.force_authenticate(user=self.user)
        serializer = CourseDetailSerializer(instance=self.course, context={'request': SimpleNamespace(user=self.user)})
        self.assertFalse(serializer.get_is_enrolled(self.course))

    # ============================================================ #

    def test_get_is_complete_returns_true_for_enrolled_user(self):
        Enrollment.objects.create(user=self.user, course=self.course)
        LessonActivity.objects.create(user=self.user, course=self.course, lesson=self.lesson, is_complete=True)
        serializer = LessonDetailSerializer(instance=self.lesson, context={'request': SimpleNamespace(user=self.user)})
        self.assertTrue(serializer.get_is_complete(self.lesson))

    def test_get_is_complete_returns_false_for_enrolled_user(self):
        Enrollment.objects.create(user=self.user, course=self.course)
        serializer = LessonDetailSerializer(instance=self.lesson, context={'request': SimpleNamespace(user=self.user)})
        self.assertFalse(serializer.get_is_complete(self.lesson))

    def test_get_is_complete_returns_false_for_not_enrolled_user(self):
        serializer = LessonDetailSerializer(instance=self.lesson, context={'request': SimpleNamespace(user=self.user)})
        self.assertFalse(serializer.get_is_complete(self.lesson))