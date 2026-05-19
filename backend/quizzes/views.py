from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from permissions import IsEnrolledInCourse
from quizzes.models import Quiz
from quizzes.serializers import QuizDetailSerializer
from quizzes.serializers import QuizSubmitSerializer


class QuizDetailView(APIView):
    permission_classes = (IsEnrolledInCourse,)

    def get(self, request, slug):
        quiz = get_object_or_404(Quiz, slug=slug)
        self.check_object_permissions(request, quiz)
        serializer = QuizDetailSerializer(quiz)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class QuizSubmitView(APIView):
    permission_classes = (IsEnrolledInCourse,)

    def post(self, request, slug):
        quiz = Quiz.objects.get(slug=slug)
        self.check_object_permissions(request, quiz)
        serializer = QuizSubmitSerializer(data=request.data, context={'request':request, 'quiz': quiz})
        serializer.is_valid(raise_exception=True)
        result = serializer.save()
        return Response(result, status=status.HTTP_200_OK)