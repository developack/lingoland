from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from permissions import IsEnrolledInCourse
from courses.serializers import TopicSerializer
from courses.serializers import CourseSerializer
from courses.serializers import LessonSerializer
from courses.serializers import CourseDetailSerializer
from courses.serializers import LessonDetailSerializer
from courses.models import Course, Lesson, LessonActivity, Topic, Enrollment


class CoursesListView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class CourseDetailView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, slug):
        course = get_object_or_404(Course, slug=slug)
        serializer = CourseDetailSerializer(course, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class LessonsListView(APIView):
    def get(self, request, slug):
        course = get_object_or_404(Course, slug=slug)
        lessons = course.lessons.all()
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class LessonDetailView(APIView):
    permission_classes = (IsEnrolledInCourse,)

    def get(self, request, slug):
        lesson = get_object_or_404(Lesson, slug=slug)
        self.check_object_permissions(request, lesson)
        serializer = LessonDetailSerializer(lesson, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class TopicDetailView(APIView):
    permission_classes = (IsEnrolledInCourse,)

    def get(self, request, slug):
        topic = get_object_or_404(Topic, slug=slug)
        self.check_object_permissions(request, topic)
        serializer = TopicSerializer(topic)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class CourseEnrollView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, slug):
        course = get_object_or_404(Course, slug=slug)
        obj, created = Enrollment.objects.get_or_create(user=request.user, course=course)
        if created:
            return Response({'detail': 'You have successfully enrolled'}, status=status.HTTP_200_OK)
        return Response({'detail': 'You are already enrolled in this course'}, status=status.HTTP_409_CONFLICT)

# ============================================================ #

class MyCoursesListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        courses = Course.objects.filter(enrollments__user=request.user)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class LessonMarkCompleteView(APIView):
    permission_classes = (IsEnrolledInCourse,)

    def post(self, request, slug):
        lesson = get_object_or_404(Lesson, slug=slug)
        self.check_object_permissions(request, lesson)
        obj, created = LessonActivity.objects.get_or_create(
            user=request.user, course=lesson.course, lesson=lesson, is_complete=True)
        if created:
            return Response({'detail':'The lesson was successfully completed.'}, status=status.HTTP_200_OK)
        return Response({'detail':'You have already completed this lesson.'}, status=status.HTTP_409_CONFLICT)