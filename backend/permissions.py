from rest_framework import permissions
from courses.models import Enrollment


class IsEnrolledInCourse(permissions.BasePermission):
    message = 'permission denied, You are not enrolled in this course'

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user

    def has_object_permission(self, request, view, obj):
        return Enrollment.objects.filter(user=request.user, course=self.get_course(obj)).exists()

    def get_course(self, obj):
        if hasattr(obj, 'course'):
            return obj.course
        elif hasattr(obj, 'lesson'):
            return obj.lesson.course
        return None