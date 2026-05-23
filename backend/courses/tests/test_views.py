from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from courses.models import Course, Lesson, Topic, Enrollment, LessonActivity


class TestCoursesListView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.courses_list_url = reverse('courses:courses-list')

    def test_user_can_get_courses_list(self):
        response = self.client.get(self.courses_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

# ============================================================ #

class TestCourseDetailView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.course_detail_url = 'courses:course-detail'
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_get_course_detail(self):
        self.authenticate()
        response = self.client.get(reverse(self.course_detail_url, args=(self.course.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_course_detail(self):
        response = self.client.get(reverse(self.course_detail_url, args=(self.course.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_course_detail_fails_when_course_not_found(self):
        self.authenticate()
        response = self.client.get(reverse(self.course_detail_url, args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# ============================================================ #

class TestLessonsListView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.lessons_list_url = 'courses:lessons-list'
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.course1 = Course.objects.create(user=cls.user, title='django')
        cls.course2 = Course.objects.create(user=cls.user, title='python')
        cls.lesson = Lesson.objects.create(course=cls.course1, title='lesson1')

    def setUp(self):
        self.lessons_count = Lesson.objects.filter(course=self.course1).count()

    def test_user_can_get_lessons_list(self):
        response = self.client.get(reverse(self.lessons_list_url, args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), self.lessons_count)

    def test_get_lessons_list_fails_when_course_not_found(self):
        response = self.client.get(reverse(self.lessons_list_url, args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_lessons_list_returns_empty_list_when_course_has_no_lessons(self):
        response = self.client.get(reverse(self.lessons_list_url, args=(self.course2.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

# ============================================================ #

class TestLessonDetailView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.lesson_detail_url = 'courses:lesson-detail'
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.other_user = User.objects.create_user(email='other@gmail.com', username='other', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')
        cls.lesson = Lesson.objects.create(course=cls.course, title='lesson')
        Enrollment.objects.create(user=cls.user, course=cls.course)

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_enrolled_user_can_get_lesson_detail(self):
        self.authenticate()
        response = self.client.get(reverse(self.lesson_detail_url, args=(self.lesson.slug,)))
        self.assertEqual(response.data['title'], self.lesson.title)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_not_enrolled_user_cannot_get_lesson_detail(self):
        self.authenticate(user=self.other_user)
        response = self.client.get(reverse(self.lesson_detail_url, args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_get_lesson_detail(self):
        response = self.client.get(reverse(self.lesson_detail_url, args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_lesson_detail_fails_when_lesson_not_found(self):
        self.authenticate()
        response = self.client.get(reverse(self.lesson_detail_url, args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# ============================================================ #

class TestTopicDetailView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.topic_detail_url = 'courses:topic-detail'
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.other_user = User.objects.create_user(email='other@gmail.com', username='other', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')
        cls.lesson = Lesson.objects.create(course=cls.course, title='lesson')
        cls.topic = Topic.objects.create(lesson=cls.lesson, title='topic')
        Enrollment.objects.create(user=cls.user, course=cls.course)

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_enrolled_user_can_get_topic_detail(self):
        self.authenticate()
        response = self.client.get(reverse(self.topic_detail_url, args=(self.topic.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.topic.title)

    def test_not_enrolled_user_cannot_get_topic_detail(self):
        self.authenticate(user=self.other_user)
        response = self.client.get(reverse(self.topic_detail_url, args=(self.topic.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_get_topic_detail(self):
        response = self.client.get(reverse(self.topic_detail_url, args=(self.topic.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_topic_detail_fails_when_topic_not_found(self):
        self.authenticate()
        response = self.client.get(reverse(self.topic_detail_url, args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

# ============================================================ #

class TestCourseEnrollView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.course_enroll_url = 'courses:course-enroll'
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.course1 = Course.objects.create(user=cls.user, title='django')
        cls.course2 = Course.objects.create(user=cls.user, title='python')
        Enrollment.objects.create(user=cls.user, course=cls.course1)

    def setUp(self):
        self.enrollments_count = Enrollment.objects.count()

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_authenticated_user_can_enroll_course(self):
        self.authenticate()
        response = self.client.post(reverse(self.course_enroll_url, args=(self.course2.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Enrollment.objects.count(), self.enrollments_count + 1)

    def test_unauthenticated_user_cannot_enroll_course(self):
        response = self.client.post(reverse(self.course_enroll_url, args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Enrollment.objects.count(), self.enrollments_count)

    def test_enroll_course_fails_when_course_does_not_exist(self):
        self.authenticate()
        response = self.client.post(reverse(self.course_enroll_url, args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_duplicate_enroll_course(self):
        self.authenticate()
        response = self.client.post(reverse(self.course_enroll_url, args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(Enrollment.objects.count(), self.enrollments_count)

# ============================================================ #

class TestMyCoursesListView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.my_courses_url = reverse('courses:my-courses')
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')
        Enrollment.objects.create(user=cls.user, course=cls.course)

    def setUp(self):
        self.enrollments_count = Enrollment.objects.count()

    def test_authenticated_user_can_get_own_courses_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.my_courses_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), self.enrollments_count)

    def test_unauthenticated_user_cannot_get_own_courses_list(self):
        response = self.client.get(self.my_courses_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)

# ============================================================ #

class TestLessonMarkCompleteView(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.lesson_complete_url = 'courses:lesson-mark-complete'
        cls.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        cls.other_user = User.objects.create_user(email='other@gmail.com', username='other', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')
        cls.lesson = Lesson.objects.create(course=cls.course, title='lesson')
        Enrollment.objects.create(user=cls.user, course=cls.course)

    def authenticate(self, user=None):
        self.client.force_authenticate(user or self.user)

    def test_enrolled_user_can_mark_lesson_complete(self):
        self.authenticate()
        response = self.client.post(reverse(self.lesson_complete_url, args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(LessonActivity.objects.count(), 1)

    def test_not_enrolled_user_cannot_mark_lesson_complete(self):
        self.authenticate(user=self.other_user)
        response = self.client.post(reverse(self.lesson_complete_url, args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(LessonActivity.objects.count(), 0)

    def test_unauthenticated_user_cannot_mark_lesson_complete(self):
        response = self.client.post(reverse(self.lesson_complete_url, args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(LessonActivity.objects.count(), 0)

    def test_mark_lesson_complete_fails_when_lesson_not_found(self):
        self.authenticate()
        response = self.client.post(reverse(self.lesson_complete_url, args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(LessonActivity.objects.count(), 0)

    def test_duplicate_mark_lesson_complete(self):
        self.authenticate()
        first_response = self.client.post(reverse(self.lesson_complete_url, args=(self.lesson.slug,)))
        second_response = self.client.post(reverse(self.lesson_complete_url, args=(self.lesson.slug,)))
        self.assertEqual(first_response.status_code, status.HTTP_200_OK)
        self.assertEqual(second_response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(LessonActivity.objects.count(), 1)
