from quizzes.models import Question, Choice
from rest_framework.exceptions import ValidationError


class QuizService:

    @classmethod
    def calculate_score(cls, data):
        """
        Expect validate quiz answers data with validate_answers(quiz, data) before use this function.
        """
        correct_answers = 0
        answers = data.get('answers')
        if not answers:
            raise ValidationError('Answers data is not found')

        questions = [answer.get('question') for answer in answers]
        correct_answer_data = {
            c.question.slug: c.text for c in Choice.objects.filter(
            is_correct=True, question__slug__in=questions).select_related('question')
        }

        for answer in answers:
            choice = answer.get('choice')
            question = answer.get('question')
            if correct_answer_data.get(question) == choice:
                correct_answers += 1
        return correct_answers

    @classmethod
    def validate_answers(cls, quiz, data):
        answers = data.get('answers')
        if not answers:
            raise ValidationError('Answers data is not found')

        for answer in answers:
            question = answer.get('question')
            choice = answer.get('choice')

            if not question or not choice:
                raise ValidationError('Invalid answer')

            try:
                question_obj = quiz.questions.get(slug=question)
                if not question_obj.choices.filter(text=choice).exists():
                    raise ValidationError(f'Choice {choice} does not belong to question {question_obj}')
            except Question.DoesNotExist:
                raise ValidationError(f'Question {question} does not belong to quiz {quiz}')
        return data