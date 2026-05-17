from rest_framework.test import APITestCase
from accounts.models import User
from courses.models import Course, Lesson, Topic, LessonActivity


class TestCourseModels(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(email='test@gamil.com', username='test', password='1234')
        cls.course = Course.objects.create(user=cls.user, title='django')
        cls.lessons = [Lesson.objects.create(user=cls.user, course=cls.course, title=f'l{n}') for n in range(1, 11)]
        cls.lessons = cls.course.lessons.order_by('created')

    def test_calculate_course_progress_returns_zero_percent_when_no_completed_lessons(self):
        result = self.course.calculate_course_progress(self.user)
        self.assertEqual(result, '0% complete')

    def test_calculate_course_progress_returns_correct_percentage(self):
        LessonActivity.objects.create(user=self.user, course=self.course, lesson=self.lessons[0], is_complete=True)
        LessonActivity.objects.create(user=self.user, course=self.course, lesson=self.lessons[1], is_complete=True)
        result = self.course.calculate_course_progress(self.user)
        self.assertEqual(result, '20% complete')

    def test_calculate_course_progress_returns_hundred_percent_when_all_lessons_completed(self):
        lesson_activities = [
            LessonActivity(user=self.user, course=self.course, lesson=lesson, is_complete=True)
            for lesson in self.lessons]
        LessonActivity.objects.bulk_create(lesson_activities)
        result = self.course.calculate_course_progress(self.user)
        self.assertEqual(result, '100% complete')

    def test_calculate_course_progress_returns_zero_percent_when_course_has_no_lessons(self):
        new_course = Course.objects.create(user=self.user, title='python')
        result = new_course.calculate_course_progress(self.user)
        self.assertEqual(result, '0% complete')

    def test_course_slug_generated_successfully(self):
        course = Course.objects.create(title='django course')
        self.assertEqual(course.slug, 'django-course')

    def test_course_slug_is_unique(self):
        course = Course.objects.create(title='django course')
        new_course = Course.objects.create(title='django course')
        self.assertEqual(new_course.slug, 'django-course-1')
        self.assertNotEqual(course.slug, new_course.slug)

    # ============================================================ #

    def test_lesson_slug_generated_successfully(self):
        lesson = Lesson.objects.create(title='django lesson')
        self.assertEqual(lesson.slug, 'django-lesson')

    def test_lesson_slug_is_unique(self):
        lesson = Lesson.objects.create(title='django lesson')
        new_lesson = Lesson.objects.create(title='django lesson')
        self.assertEqual(new_lesson.slug, 'django-lesson-1')
        self.assertNotEqual(lesson.slug, new_lesson.slug)

    # ============================================================ #

    def test_topic_slug_generated_successfully(self):
        topic = Topic.objects.create(title='django topic')
        self.assertEqual(topic.slug, 'django-topic')

    def test_topic_slug_is_unique(self):
        topic = Topic.objects.create(title='django topic')
        new_topic = Topic.objects.create(title='django topic')
        self.assertEqual(new_topic.slug, 'django-topic-1')
        self.assertNotEqual(topic.slug, new_topic.slug)