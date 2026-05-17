from django.db import transaction
from orders.models import Order, OrderItem
from courses.models import Course, Enrollment


class OrderService:

    @staticmethod
    @transaction.atomic
    def create_order(user, courses_slug):
        if not courses_slug:
            raise ValueError('Courses slug cannot be empty')

        order, _ = Order.objects.get_or_create(user=user, status='Pending')
        courses = Course.objects.filter(slug__in=courses_slug)

        found_courses_slug = {course.slug for course in courses}
        input_courses_slug = set(courses_slug)

        missing_courses = input_courses_slug.difference(found_courses_slug)
        if missing_courses:
            raise ValueError(f'These courses do not exist: {missing_courses}')

        enrolled_courses = Enrollment.objects.filter(
            user=user, course__in=courses).values_list('course__title', flat=True)

        if enrolled_courses:
            raise ValueError(f'You are already enrolled in: {", ".join(enrolled_courses)}')

        duplicate_order_items = OrderItem.objects.filter(
            order=order, course__in=courses).values_list('course__title', flat=True)

        if duplicate_order_items:
            raise ValueError(f'These courses already exist in your order: {", ".join(duplicate_order_items)}')

        order_items = []
        total_price = 0
        for course in courses:
            order_items.append(OrderItem(order=order, course=course, price=course.price))
            total_price += course.price

        OrderItem.objects.bulk_create(order_items)
        order.total_price += total_price
        order.save()
        return order