from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from accounts.models import User
from courses.models import Course, Enrollment
from quizzes.models import Quiz, Question, Choice


class TestQuizViews(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.other_user = User.objects.create_user(email='new@gmail.com', username='new', password='1234')
        self.course = Course.objects.create(user=self.user, title='django')
        self.quiz = Quiz.objects.create(user=self.user, course=self.course, title='quiz')
        self.question1 = Question.objects.create(quiz=self.quiz, title='q 1')
        self.question2 = Question.objects.create(quiz=self.quiz, title='q 2')
        self.choice1 = Choice.objects.create(question=self.question1, text='ch3', is_correct=True)
        self.choice2 = Choice.objects.create(question=self.question2, text='ch2', is_correct=False)
        Enrollment.objects.create(user=self.user, course=self.course)
        self.data = {
            'answers': [
                {'question': self.question1.slug, 'choice': self.choice1.text},
                {'question': self.question2.slug, 'choice': self.choice2.text},
            ]
        }

    def test_enrolled_user_can_get_quiz_details(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('quizzes:quiz-detail', args=(self.quiz.slug,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_not_enrolled_user_cannot_get_quiz_details(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.get(reverse('quizzes:quiz-detail', args=(self.quiz.slug,)))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_unauthenticated_user_cannot_get_quiz_details(self):
        response = self.client.get(reverse('quizzes:quiz-detail', args=(self.quiz.slug,)))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_quiz_detail_returns_404_when_quiz_not_found(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('quizzes:quiz-detail', args=('wrong-slug',)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # ============================================================ #

    def test_enrolled_user_can_submit_quiz(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('quizzes:quiz-submit', args=(self.quiz.slug,)), data=self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_not_enrolled_user_cannot_submit_quiz(self):
        self.client.force_authenticate(user=self.other_user)
        response = self.client.post(reverse('quizzes:quiz-submit', args=(self.quiz.slug,)), data=self.data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_submit_quiz_with_invalid_data(self):
        self.client.force_authenticate(user=self.user)
        data = {
            'answers': [
                {'choice': 'ch3'},
                {'question': 'q-2'},
            ]
        }
        response = self.client.post(reverse('quizzes:quiz-submit', args=(self.quiz.slug,)), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_submit_quiz_returns_correct_response(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('quizzes:quiz-submit', args=(self.quiz.slug,)), data=self.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, '1 / 2 correct answers')