import uuid
from django.db import models
from django.utils.text import slugify
from django.contrib.contenttypes.fields import GenericRelation
from accounts.models import User
from comments.models import Comment


class Article(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='articles')
    comments = GenericRelation(Comment)
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=256, unique=True)
    excerpt = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    thumbnail = models.ImageField(upload_to='articles/thumbnail/', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'article'
        verbose_name_plural = '01- articles'

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            counter = 1
            slug = slugify(self.title, allow_unicode=True)
            while Article.objects.filter(slug=slug).exists():
                slug = f'{slug}-{counter}'
                counter += 1
            self.slug = slug
        return super(Article, self).save(*args, **kwargs)