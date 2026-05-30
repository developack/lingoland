from django.contrib.auth.models import ContentType
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from comments.models import Comment
from comments.serializers import CommentSerializer
from comments.serializers import CommentsListSerializer
from comments.serializers import CommentCreateSerializer


class CommentCreateView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CommentCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# ============================================================ #

class MyCommentsListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        comments = Comment.objects.filter(user=request.user)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class CommentsListView(APIView):

    def get(self, request, *args, **kwargs):
        content_type = kwargs.get('type')
        object_id = kwargs.get('pk')
        content_type_obj = ContentType.objects.get(model=content_type)
        comments = Comment.objects.filter(content_type=content_type_obj, object_id=object_id)

        serializer = CommentsListSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)