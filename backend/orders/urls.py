from django.urls import path
from orders import views


app_name = 'orders'
urlpatterns = [
    path('my-orders/', views.MyOrdersListView.as_view(), name='my-orders'),
    path('order/<uuid:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('orders/', views.OrderCreateView.as_view(), name='orders'),
    path('orders/payment/', views.PaymentView.as_view(), name='payment'),
]