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
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Topic
        fields = '__all__'

    def get_comments(self, obj):
        objects = obj.comments.all()
        return CommentSerializer(instance=objects, many=True).data

# ============================================================ #

class CourseDetailSerializer(serializers.ModelSerializer):
    lessons = serializers.SerializerMethodField()
    is_enrolled = serializers.SerializerMethodField()
    progress_percentage = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = '__all__'

    def get_lessons(self, obj):
        objects = obj.lessons.all()
        return LessonSerializer(instance=objects, many=True).data

    def get_is_enrolled(self, obj):
        user = self.context['request'].user
        return obj.enrollments.filter(user=user).exists()

    def get_progress_percentage(self, obj):
        user = self.context['request'].user
        return obj.calculate_course_progress(user)

    def get_comments(self, obj):
        objects = obj.comments.all()
        return CommentSerializer(instance=objects, many=True).data

# ============================================================ #

class LessonDetailSerializer(serializers.ModelSerializer):
    topics = serializers.SerializerMethodField()
    is_complete = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Lesson
        fields = '__all__'

    def get_topics(self, obj):
        objects = obj.topics.all()
        return TopicSerializer(instance=objects, many=True).data

    def get_is_complete(self, obj):
        user = self.context['request'].user
        try:
            return obj.lesson_activities.get(user=user, course=obj.course).is_complete
        except ObjectDoesNotExist:
            return False

    def get_comments(self, obj):
        objects = obj.comments.all()
        return CommentSerializer(instance=objects, many=True).data