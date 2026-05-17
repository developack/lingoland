from types import SimpleNamespace
from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from accounts.models import User
from quizzes.serializers import QuizSubmitSerializer
from quizzes.models import Quiz, Question, Choice, QuizAttempt


class TestQuizSerializers(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.quiz = Quiz.objects.create(title='django quiz')
        self.question1 = Question.objects.create(quiz=self.quiz, title='q 1')
        self.question2 = Question.objects.create(quiz=self.quiz, title='q 2')
        Choice.objects.create(question=self.question1, text='ch3', is_correct=True)
        Choice.objects.create(question=self.question2, text='ch2', is_correct=False)
        self.data = {
            'answers': [
                {'question': 'q-1', 'choice': 'ch3'},
                {'question': 'q-2', 'choice': 'ch2'},
            ]
        }

    def test_quiz_submit_serializer_validate_method_returns_data_successfully(self):
        serializer = QuizSubmitSerializer(data=self.data, context={'quiz': self.quiz})
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data, self.data)

    def test_quiz_submit_serializer_with_invalid_answers(self):
        data = {
            'answers': [
                {'question': 'q-3', 'choice': 'ch3'},
                {'question': 'q-4', 'choice': 'ch2'},
            ]
        }
        serializer = QuizSubmitSerializer(data=data, context={'quiz': self.quiz})
        with self.assertRaises(ValidationError) as context:
            serializer.is_valid(raise_exception=True)
        self.assertIn('does not belong to quiz', str(context.exception))

    def test_quiz_submit_serializer_create_method_save_quiz_attempt_successfully(self):
        request = SimpleNamespace(user=self.user)
        serializer = QuizSubmitSerializer(data=self.data, context={'request': request,'quiz': self.quiz})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        quiz_attempt = QuizAttempt.objects.first()
        self.assertEqual(quiz_attempt.quiz, self.quiz)
        self.assertEqual(quiz_attempt.user, self.user)
        self.assertEqual(QuizAttempt.objects.count(), 1)
