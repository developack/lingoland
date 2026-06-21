from django.db.models import Count, Q
from django.contrib.auth.models import ContentType
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from comments.models import Comment
from comments.serializers import CommentSerializer
from comments.serializers import CommentsListSerializer
from comments.serializers import CommentCreateSerializer
from comments.serializers import CommentStatsSerializer


class CommentCreateView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = CommentCreateSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# ============================================================ #

class CommentStatsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        stats = Comment.objects.aggregate(
            comments_count=Count('id', filters=Q(user=request.user)),
            approved_comments_count=Count('id', filter=Q(user=request.user, status='Approved')),
            unapproved_comments_count=Count('id', filter=Q(user=request.user, status='Unapproved')),
        )
        serializer = CommentStatsSerializer(stats)
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class MyCommentsListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        comments = Comment.objects.filter(user=request.user)
        serializer = CommentSerializer(comments, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

# ============================================================ #

class CommentsListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        content_type = kwargs.get('type')
        object_id = kwargs.get('pk')
        content_type_obj = ContentType.objects.get(model=content_type)
        comments = Comment.objects.filter(content_type=content_type_obj, object_id=object_id)

        serializer = CommentsListSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)