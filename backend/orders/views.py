from django.db.models import Count, Q
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from orders.models import Order
from orders.serializers import OrderSerializer
from orders.services.order import OrderService
from orders.services.payment import PaymentService
from orders.serializers import OrderCreateSerializer
from orders.serializers import OrderStatsSerializer


class MyOrdersListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class OrderStatsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        stats = Order.objects.aggregate(
            orders_count=Count('id', filter=Q(user=request.user)),
            complete_orders_count=Count('id', filter=Q(user=request.user, status='Completed')),
            pending_orders_count=Count('id', filter=Q(user=request.user, status='Pending')),
        )
        serializer = OrderStatsSerializer(stats)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class OrderDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        order = get_object_or_404(Order, user=request.user, id=pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class OrderView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        order = get_object_or_404(Order, user=request.user, status='Pending')
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OrderCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            OrderService.create_order(user=request.user, courses_slug=serializer.validated_data['courses'])
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'Order create successfully'}, status=status.HTTP_201_CREATED)

# ============================================================ #

class PaymentView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            PaymentService.payment(user=request.user)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail':'Your payment was successful'}, status=status.HTTP_200_OK)