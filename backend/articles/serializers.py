from rest_framework import serializers
from articles.models import Article
from comments.serializers import CommentSerializer


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('title', 'slug', 'excerpt')

# ============================================================ #

class ArticleDetailSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = '__all__'

    def get_comments(self, obj):
        objects = obj.comments.all()
        return CommentSerializer(instance=objects, many=True).data