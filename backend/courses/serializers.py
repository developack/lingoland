from rest_framework import serializers
from courses.models import Course, Lesson, Topic
from quizzes.serializers import QuizSerializer


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# ============================================================ #

class UserCourseSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_progress_percentage(self, obj):
        user = self.context['request'].user
        return obj.calculate_course_progress(user)

# ============================================================ #

class TopicSerializer(serializers.ModelSerializer):
    lesson = serializers.CharField(source='lesson.id', read_only=True)
    course = serializers.CharField(source='lesson.course.id', read_only=True)

    class Meta:
        model = Topic
        fields = ('id', 'title', 'slug', 'content', 'lesson', 'course')

# ============================================================ #

class LessonSerializer(serializers.ModelSerializer):
    is_complete = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        exclude = ('created', 'updated')

    def get_is_complete(self, obj):
        user = self.context['request'].user
        return obj.is_complete(user)


class LessonDetailSerializer(serializers.ModelSerializer):
    is_complete = serializers.SerializerMethodField()
    topics = TopicSerializer(many=True, read_only=True)
    quizzes = QuizSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        exclude = ('created', 'updated')

    def get_is_complete(self, obj):
        user = self.context['request'].user
        return obj.is_complete(user)

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
        exclude = ('created', 'updated')

    def get_progress_percentage(self, obj):
        user = self.context['request'].user
        return obj.calculate_course_progress(user)