from django.urls import path
from comments import views


app_name = 'comments'
urlpatterns = [
    path('comments/create/', views.CommentCreateView.as_view(), name='comment-create'),
    path('my-comments/', views.MyCommentsListView.as_view(), name='my-comments'),
    path('comments/<str:type>/<uuid:pk>/', views.CommentsListView.as_view(), name='comments-list')
]