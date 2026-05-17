from rest_framework.test import APITestCase
from rest_framework.exceptions import ValidationError
from accounts.models import User
from quizzes.services.quiz import QuizService
from quizzes.models import Quiz, Question, Choice


class TestQuiz(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='1234')
        self.quiz = Quiz.objects.create(user=self.user, title='django quiz')
        self.question = Question.objects.create(quiz=self.quiz, title='django q1')
        self.choice = Choice.objects.create(question=self.question, text='django q1-ca', is_correct=True)
        self.wrong_choice = Choice.objects.create(question=self.question, text='django q1-cb', is_correct=False)

    def test_validate_answers_fails_when_answers_is_missing(self):
        with self.assertRaises(ValidationError) as context:
            QuizService.validate_answers(quiz=self.quiz, data={'answers': []})
        self.assertIn('Answers data is not found', str(context.exception))

    def test_validate_answers_fails_when_question_or_choice_is_missing(self):
        data = {'answers': [
            {'choice': 'q1-c3'},
            {'question': 'q-2'}
        ]}
        with self.assertRaises(ValidationError) as context:
            QuizService.validate_answers(quiz=self.quiz, data=data)
        self.assertIn('Invalid answer', str(context.exception))

    def test_validate_answers_fails_when_question_does_not_belong_to_quiz(self):
        data = {'answers': [
            {'question': 'q-1', 'choice': 'q1-c3'},
            {'question': 'q-2', 'choice': 'q2-c1'}
        ]}
        with self.assertRaises(ValidationError) as context:
            QuizService.validate_answers(quiz=self.quiz, data=data)
        self.assertIn('does not belong to quiz', str(context.exception))

    def test_validate_answers_fails_when_choice_does_not_belong_to_question(self):
        data = {'answers': [
            {'question': self.question.slug, 'choice': 'q1-c2'},
        ]}
        with self.assertRaises(ValidationError) as context:
            QuizService.validate_answers(quiz=self.quiz, data=data)
        self.assertIn('does not belong to question', str(context.exception))

    def test_validate_answers_returns_validated_data_successfully(self):
        data = {'answers': [
            {'question': self.question.slug, 'choice': self.choice.text},
        ]}
        validated_data = QuizService.validate_answers(quiz=self.quiz, data=data)
        self.assertEqual(validated_data, data)

    # ============================================================ #

    def test_calculate_score_fails_when_answers_is_missing(self):
        with self.assertRaises(ValidationError) as context:
            QuizService.calculate_score(data={'answers': []})
        self.assertIn('Answers data is not found', str(context.exception))

    def test_calculate_score_returns_correct_answers_count(self):
        data = {'answers': [
            {'question': self.question.slug, 'choice': self.choice.text},
        ]}
        correct_answers = QuizService.calculate_score(data=data)
        self.assertEqual(correct_answers, 1)

    def test_calculate_score_returns_zero_for_wrong_answer(self):
        data = {'answers': [
            {'question': self.question.slug, 'choice': self.wrong_choice.text},
        ]}
        correct_answers = QuizService.calculate_score(data=data)
        self.assertEqual(correct_answers, 0)