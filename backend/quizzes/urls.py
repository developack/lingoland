from django.urls import path
from quizzes import views


app_name = 'quizzes'
urlpatterns = [
    path('quiz/<str:slug>/', views.QuizDetailView.as_view(), name='quiz-detail'),
    path('quiz/<str:slug>/submit/', views.QuizSubmitView.as_view(), name='quiz-submit')
]