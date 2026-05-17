from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from articles.models import Article
from articles.serializers import ArticleSerializer
from articles.serializers import ArticleDetailSerializer


class ArticlesListView(APIView):
    def get(self, request):
        articles = Article.objects.all()
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class ArticleDetailView(APIView):
    def get(self, request, slug):
        article = Article.objects.get(slug=slug)
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)