from rest_framework import serializers
from orders.models import Order, OrderItem


class OrderCreateSerializer(serializers.Serializer):
    courses = serializers.ListField(child=serializers.CharField(), min_length=1, required=True)

# ============================================================ #

class OrderItemSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title')
    course_thumbnail = serializers.ImageField(source='course.thumbnail')

    class Meta:
        model = OrderItem
        fields = '__all__'

# ============================================================ #

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

# ============================================================ #

class OrderStatsSerializer(serializers.Serializer):
    orders_count = serializers.IntegerField()
    complete_orders_count = serializers.IntegerField()
    pending_orders_count = serializers.IntegerField()