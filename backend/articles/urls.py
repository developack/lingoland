from django.urls import path
from articles import views


app_name = 'articles'
urlpatterns = [
    path('articles/', views.ArticlesListView.as_view(), name='articles-list'),
    path('article/<str:slug>/', views.ArticleDetailView.as_view(), name='article-detail'),
]