import uuid
from django.db import models
from accounts.models import User
from django.db.models import Q
from courses.models import Course


ORDER_STATUS_CHOICES = (
    ('Completed','Completed'),
    ('Failed','Failed'),
    ('Pending','Pending'),
)

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders')
    status = models.CharField(max_length=16, choices=ORDER_STATUS_CHOICES, default='Pending')
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user'], condition=Q(status='Pending'), name='unique_pending_order'),
        ]
        ordering = ['-status']
        verbose_name = 'order'
        verbose_name_plural = '01- orders'

    def __str__(self):
        return f'{self.user} - {self.status}'

# ============================================================ #

class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, related_name='order_items')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, related_name='order_items')
    price = models.DecimalField(max_digits=10, decimal_places=2 ,default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['order', 'course'], name='unique_order_item'),
        ]
        verbose_name = 'order item'
        verbose_name_plural = '02- order items'

    def __str__(self):
        return f'{self.id}'