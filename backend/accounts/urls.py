from django.urls import path
from rest_framework.authtoken import views as auth_token
from accounts import views


app_name = 'accounts'
urlpatterns = [
    path('token/', auth_token.obtain_auth_token),
    path('login/', views.UserLoginView.as_view(), name='login'),
    path('register/', views.UserRegisterView.as_view(), name='register'),
    path('user-profile/', views.UserProfileView.as_view(), name='user-profile')
]