from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from articles.models import Article
from comments.models import Comment
from accounts.serializers import UserProfileSerializer
from courses.models import Lesson, Topic, Enrollment, Course


class CommentSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(source='user.user_profile', read_only=True)

    class Meta:
        model = Comment
        fields = ('user', 'text', 'status', 'created')

# ============================================================ #

class CommentsListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(source='user.user_profile', read_only=True)

    class Meta:
        model = Comment
        fields = ('user', 'text', 'status', 'created')

# ============================================================ #

TYPE_CHOICES = (
    ('Article', 'Article'),
    ('Course', 'Course'),
    ('Lesson', 'Lesson'),
    ('Topic', 'Topic')
)

class CommentCreateSerializer(serializers.Serializer):
    model_map = {
        'Article': Article,
        'Course': Course,
        'Lesson': Lesson,
        'Topic': Topic,
    }
    type = serializers.ChoiceField(choices=TYPE_CHOICES, required=True, write_only=True)
    slug = serializers.CharField(required=True, write_only=True)
    text = serializers.CharField(required=True)

    def validate(self, data):
        content_type = data.get('type')
        object_slug = data.get('slug')

        try:
            self.content_object = self.model_map[content_type].objects.get(slug=object_slug)
        except ObjectDoesNotExist:
            raise serializers.ValidationError('Content object does not exist')

        if content_type == 'Lesson':
            course = self.content_object.course
        elif content_type == 'Topic':
            course = self.content_object.lesson.course
        else:
            return data

        user = self.context['request'].user
        if not Enrollment.objects.filter(user=user, course=course).exists():
            raise serializers.ValidationError('Only enroll users can submit comments on lessons or topics.')
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        text = validated_data['text']
        comment = Comment.objects.create(content_object=self.content_object, user=user, text=text)
        return comment