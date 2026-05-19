from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from comments.models import Comment
from comments.serializers import CommentSerializer
from comments.serializers import CommentCreateSerializer


class CommentCreateView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CommentCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Comment created successfully'}, status=status.HTTP_201_CREATED)

# ============================================================ #

class MyCommentsListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        comments = Comment.objects.filter(user=request.user)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)