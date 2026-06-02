from rest_framework import serializers
from articles.models import Article
from comments.serializers import CommentSerializer


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        exclude = ('user', 'created', 'updated')

# ============================================================ #

class ArticleDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Article
        fields = '__all__'