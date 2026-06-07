from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from courses.models import Course, Lesson, Topic
from quizzes.serializers import QuizSerializer


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# ============================================================ #

class TopicSerializer(serializers.ModelSerializer):
    lesson = serializers.CharField(source='lesson.title', read_only=True)
    course = serializers.CharField(source='lesson.course.id', read_only=True)

    class Meta:
        model = Topic
        fields = ('id', 'title', 'slug', 'content', 'lesson', 'course')

# ============================================================ #

class LessonDetailSerializer(serializers.ModelSerializer):
    is_complete = serializers.SerializerMethodField()
    topics = TopicSerializer(many=True, read_only=True)
    quizzes = QuizSerializer(many=True, read_only=True)
    course = serializers.CharField(source='course.id', read_only=True)

    class Meta:
        model = Lesson
        exclude = ('comments', 'created', 'updated')

    def get_is_complete(self, obj):
        user = self.context['request'].user
        try:
            return obj.lesson_activities.get(user=user, course=obj.course).is_complete
        except ObjectDoesNotExist:
            return False

# ============================================================ #

class CourseDetailSerializer(serializers.ModelSerializer):
    is_enrolled = serializers.SerializerMethodField()
    lessons = LessonDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

    def get_is_enrolled(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.enrollments.filter(user=user).exists()
        return False

# ============================================================ #

class LearningContextSerializer(serializers.ModelSerializer):
    lessons = LessonDetailSerializer(many=True, read_only=True)
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Course
        exclude = ('comments', 'created', 'updated')

    def get_progress_percentage(self, obj):
        user = self.context['request'].user
        return obj.lesson.course.calculate_course_progress(user)