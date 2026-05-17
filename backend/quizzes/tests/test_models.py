from rest_framework.test import APITestCase
from quizzes.models import Quiz, Question, QuizAttempt


class TestQuizModels(APITestCase):

    def test_quiz_slug_generated_successfully(self):
        quiz = Quiz.objects.create(title='django quiz')
        self.assertEqual(quiz.slug, 'django-quiz')

    def test_quiz_slug_is_unique(self):
        quiz = Quiz.objects.create(title='django quiz')
        new_quiz = Quiz.objects.create(title='django quiz')
        self.assertEqual(new_quiz.slug, 'django-quiz-1')
        self.assertNotEqual(quiz.slug, new_quiz.slug)

    def test_question_slug_generated_successfully(self):
        question = Question.objects.create(title='question 1')
        self.assertEqual(question.slug, 'question-1')

    def test_question_slug_is_unique(self):
        question = Question.objects.create(title='question 1')
        new_question = Question.objects.create(title='question 1')
        self.assertEqual(new_question.slug, 'question-1-1')
        self.assertNotEqual(question.slug, new_question.slug)

    def test_quiz_attempt_fill_total_questions_successfully(self):
        quiz = Quiz.objects.create(title='django quiz')
        Question.objects.create(quiz=quiz, title='question 1')
        Question.objects.create(quiz=quiz, title='question 2')
        quiz_attempt = QuizAttempt.objects.create(quiz=quiz)
        self.assertEqual(quiz_attempt.total_questions, 2)