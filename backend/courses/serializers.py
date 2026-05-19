from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from courses.models import Course, Lesson, Topic
from comments.serializers import CommentSerializer


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# ============================================================ #

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ('title', 'excerpt')

# ============================================================ #

class TopicSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = '__all__'

# ============================================================ #

class CourseDetailSerializer(serializers.ModelSerializer):
    is_enrolled = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()
    lessons = LessonSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'

    def get_is_enrolled(self, obj):
        user = self.context['request'].user
        return obj.enrollments.filter(user=user).exists()

    def get_progress_percentage(self, obj):
        user = self.context['request'].user
        return obj.calculate_course_progress(user)

# ============================================================ #

class LessonDetailSerializer(serializers.ModelSerializer):
    is_complete = serializers.SerializerMethodField()
    topics = TopicSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Lesson
        fields = '__all__'

    def get_is_complete(self, obj):
        user = self.context['request'].user
        try:
            return obj.lesson_activities.get(user=user, course=obj.course).is_complete
        except ObjectDoesNotExist:
            return False