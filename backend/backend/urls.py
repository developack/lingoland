from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls', namespace='accounts')),
    path('', include('courses.urls', namespace='courses')),
    path('', include('quizzes.urls', namespace='quizzes')),
    path('', include('articles.urls', namespace='articles')),
    path('', include('comments.urls', namespace='comments')),
    path('', include('orders.urls', namespace='orders'))
]
