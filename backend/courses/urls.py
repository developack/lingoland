from django.urls import path
from courses import views


app_name = 'courses'
urlpatterns = [
    path('courses/', views.CoursesListView.as_view(), name='courses-list'),
    path('course/<str:slug>/', views.CourseDetailView.as_view(), name='course-detail'),
    path('course/<str:slug>/lessons/', views.LessonsListView.as_view(), name='lessons-list'),
    path('lesson/<str:slug>/', views.LessonDetailView.as_view(), name='lesson-detail'),
    path('topic/<str:slug>/', views.TopicDetailView.as_view(), name='topic-detail'),
    path('course/<str:slug>/enroll/', views.CourseEnrollView.as_view(), name='course-enroll'),
    path('my-courses/', views.MyCoursesListView.as_view(), name='my-courses'),
    path('lesson/<str:slug>/mark-complete/', views.LessonMarkCompleteView.as_view(), name='lesson-mark-complete')
]