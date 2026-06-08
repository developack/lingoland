from django.urls import path
from orders import views


app_name = 'orders'
urlpatterns = [
    path('my-orders/', views.MyOrdersListView.as_view(), name='my-orders'),
    path('orders/stats/', views.OrderStatsView.as_view(), name='order-stats'),
    path('order/<uuid:pk>/', views.OrderDetailView.as_view(), name='order-detail'),
    path('order/', views.OrderView.as_view(), name='order'),
    path('order/payment/', views.PaymentView.as_view(), name='payment'),
]