import uuid
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from accounts.models import User


COMMENT_STATUS_CHOICES = (
    ('None', 'None'),
    ('Approved', 'Approved'),
    ('Unapproved', 'Unapproved'),
    ('Spam', 'Spam')
)

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='comments')
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, related_name='comments')
    status = models.CharField(max_length=16, choices=COMMENT_STATUS_CHOICES, default='Unapproved')
    text = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['content_type', 'object_id'])
        ]
        verbose_name = 'comment'
        verbose_name_plural = '01- comments'

    def __str__(self):
        return f'{self.user} - {self.text}'