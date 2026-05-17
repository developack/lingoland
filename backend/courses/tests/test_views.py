from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from courses.models import Course, Lesson, Topic, Enrollment, LessonActivity


class TestCourseViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(email='test@gmail.com', username='test', password='1234')
        self.other_user = User.objects.create_user(email='other@gmail.com', username='other', password='1234')
        self.course1 = Course.objects.create(user=self.user, title='django')
        self.course2 = Course.objects.create(user=self.user, title='python')
        self.lesson = Lesson.objects.create(user=self.user, course=self.course1, title='lesson1')
        self.topic = Topic.objects.create(user=self.user, lesson=self.lesson, title='topic1')
        Enrollment.objects.create(user=self.user, course=self.course1)

    def test_user_can_get_courses_list(self):
        response = self.client.get(reverse('courses:courses-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # ============================================================ #

    def test_authenticated_user_can_get_course_detail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:course-detail', args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_get_course_detail(self):
        response = self.client.get(reverse('courses:course-detail', args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_course_detail_fails_when_course_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:course-detail', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================ #

    def test_user_can_get_lessons_list(self):
        response = self.client.get(reverse('courses:lessons-list', args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_lessons_list_fails_when_course_not_found(self):
        response = self.client.get(reverse('courses:lessons-list', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_lessons_list_returns_empty_list_when_course_has_no_lessons(self):
        response = self.client.get(reverse('courses:lessons-list', args=(self.course2.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    # ============================================================ #

    def test_enrolled_user_can_get_lesson_detail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:lesson-detail', args=(self.lesson.slug,)))
        self.assertEqual(response.data['title'], self.lesson.title)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_not_enrolled_user_cannot_get_lesson_detail(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(reverse('courses:lesson-detail', args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_get_lesson_detail(self):
        response = self.client.get(reverse('courses:lesson-detail', args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_lesson_detail_fails_when_lesson_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:lesson-detail', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================ #

    def test_enrolled_user_can_get_topic_detail(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:topic-detail', args=(self.topic.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.topic.title)

    def test_not_enrolled_user_cannot_get_topic_detail(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(reverse('courses:topic-detail', args=(self.topic.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_get_topic_detail(self):
        response = self.client.get(reverse('courses:topic-detail', args=(self.topic.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_topic_detail_fails_when_topic_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:topic-detail', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================ #

    def test_authenticated_user_can_enroll_course(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('courses:course-enroll', args=(self.course2.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Enrollment.objects.count(), 2)

    def test_unauthenticated_user_cannot_enroll_course(self):
        response = self.client.post(reverse('courses:course-enroll', args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Enrollment.objects.count(), 1)

    def test_enroll_course_fails_when_course_does_not_exist(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('courses:course-enroll', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_duplicate_enroll_course(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('courses:course-enroll', args=(self.course1.slug,)))
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(Enrollment.objects.count(), 1)

    # ============================================================ #

    def test_authenticated_user_can_get_own_courses_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('courses:my-courses'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_unauthenticated_user_cannot_get_own_courses_list(self):
        response = self.client.get(reverse('courses:my-courses'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)

    # ============================================================ #

    def test_enrolled_user_can_mark_lesson_complete(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('courses:lesson-mark-complete', args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(LessonActivity.objects.count(), 1)

    def test_not_enrolled_user_cannot_mark_lesson_complete(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.post(reverse('courses:lesson-mark-complete', args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(LessonActivity.objects.count(), 0)

    def test_unauthenticated_user_cannot_mark_lesson_complete(self):
        response = self.client.post(reverse('courses:lesson-mark-complete', args=(self.lesson.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(LessonActivity.objects.count(), 0)

    def test_mark_lesson_complete_fails_when_lesson_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('courses:lesson-mark-complete', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(LessonActivity.objects.count(), 0)

    def test_duplicate_mark_lesson_complete(self):
        self.client.force_authenticate(user=self.user)
        first_response = self.client.post(reverse('courses:lesson-mark-complete', args=(self.lesson.slug,)))
        second_response = self.client.post(reverse('courses:lesson-mark-complete', args=(self.lesson.slug,)))
        self.assertEqual(first_response.status_code, status.HTTP_200_OK)
        self.assertEqual(second_response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(LessonActivity.objects.count(), 1)
