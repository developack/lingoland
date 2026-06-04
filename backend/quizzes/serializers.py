from rest_framework import serializers
from quizzes.services.quiz import QuizService
from quizzes.models import Quiz, Question, Choice, QuizAttempt


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

# ============================================================ #

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('text',)

# ============================================================ #

class AnswerSerializer(serializers.Serializer):
    question = serializers.CharField()
    choice = serializers.CharField()

# ============================================================ #

class QuestionDetailSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

# ============================================================ #

class QuizDetailSerializer(serializers.ModelSerializer):
    questions = QuestionDetailSerializer(many=True, read_only=True)
    lesson = serializers.CharField(source='lesson.title', read_only=True)
    course = serializers.CharField(source='lesson.course.slug', read_only=True)
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Quiz
        fields = '__all__'

    def get_progress_percentage(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.lesson.course.calculate_course_progress(user)
        return 0

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
        return f'{correct_answers} / {len(validated_data.get("answers"))} correct answers'