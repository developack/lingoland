from rest_framework import serializers
from quizzes.services.quiz import QuizService
from quizzes.models import Quiz, Question, Choice, QuizAttempt


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

# ============================================================ #

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

# ============================================================ #

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('text',)

# ============================================================ #

class QuestionDetailSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = '__all__'

    def get_choices(self, obj):
        objects = obj.choices.all()
        return ChoiceSerializer(instance=objects, many=True).data

# ============================================================ #

class QuizDetailSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = '__all__'

    def get_questions(self, obj):
        objects = obj.questions.all()
        return QuestionDetailSerializer(instance=objects, many=True).data

# ============================================================ #

class AnswerSerializer(serializers.Serializer):
    question = serializers.CharField()
    choice = serializers.CharField()

# ============================================================ #

class QuizSubmitSerializer(serializers.Serializer):
    answers = AnswerSerializer(many=True)

    def validate(self, data):
        quiz = self.context['quiz']
        QuizService.validate_answers(quiz, data)
        return data

    def create(self, validated_data):
        quiz = self.context['quiz']
        user = self.context['request'].user
        correct_answers = QuizService.calculate_score(validated_data)
        QuizAttempt.objects.create(user=user, quiz=quiz, correct_answers=correct_answers)
        return f'{correct_answers} / {len(validated_data.get('answers'))} correct answers'
