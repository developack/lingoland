from rest_framework import serializers
from orders.models import Order, OrderItem


class OrderCreateSerializer(serializers.Serializer):
    courses = serializers.ListField(child=serializers.CharField(), min_length=1, required=True)

# ============================================================ #

class OrderItemSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title')

    class Meta:
        model = OrderItem
        fields = '__all__'

# ============================================================ #

class OrderSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_items(self, obj):
        objects = obj.order_items.all()
        return OrderItemSerializer(instance=objects, many=True).data