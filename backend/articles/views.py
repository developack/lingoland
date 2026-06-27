from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from articles.models import Article
from backend.pagination import CustomPagination
from articles.serializers import ArticleSerializer
from articles.serializers import ArticleDetailSerializer


class ArticlesListView(APIView):
    pagination_class = CustomPagination

    def get(self, request):
        articles = Article.objects.all()
        paginator = self.pagination_class()
        page = paginator.paginate_queryset(articles, request)
        serializer = ArticleSerializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)

# ============================================================ #

class ArticleDetailView(APIView):
    def get(self, request, slug):
        article = Article.objects.get(slug=slug)
        serializer = ArticleDetailSerializer(article)
        return Response(serializer.data, status=status.HTTP_200_OK)