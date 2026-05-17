from orders.models import Order
from django.db import transaction
from courses.models import Enrollment


class PaymentService:

    @staticmethod
    @transaction.atomic
    def payment(user):
        order = Order.objects.filter(user=user).order_by('-created').first()
        if not order:
            raise ValueError('Order does not exist')

        if order.status == 'Completed':
            return order

        if order.status != 'Pending':
            raise ValueError('Order is not payable')

        if not order.order_items.all().exists():
            raise ValueError('There is no item in your order')

        for order_item in order.order_items.all():
            Enrollment.objects.get_or_create(user=user, course=order_item.course)
        order.status = 'Completed'
        order.save()
        return order