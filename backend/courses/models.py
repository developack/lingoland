import uuid
from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from utils.utils import Utils
from accounts.models import User
from comments.models import Comment


class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='courses')
    comments = GenericRelation(Comment)
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=256, unique=True)
    excerpt = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    thumbnail = models.ImageField(upload_to='courses/thumbnail/', blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'course'
        verbose_name_plural = '01- courses'

    def __str__(self):
        return f'{self.title}'

    def calculate_course_progress(self, user):
        lessons_count = self.lessons.count()
        if lessons_count == 0:
            return '0% complete'
        complete_lessons_count = self.lesson_activities.filter(user=user, is_complete=True).count()
        percentage = round((complete_lessons_count / lessons_count) * 100)
        return f'{percentage}% complete'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_unique_slug(self, Course)
        return super(Course, self).save(*args, **kwargs)

# ============================================================ #

class Lesson(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='lessons')
    comments = GenericRelation(Comment)
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=256, unique=True)
    excerpt = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    thumbnail = models.ImageField(upload_to='courses/lessons/thumbnail/', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'lesson'
        verbose_name_plural = '02- lessons'

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_unique_slug(self, Lesson)
        return super(Lesson, self).save(*args, **kwargs)

# ============================================================ #

class LessonActivity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='lesson_activities')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='lesson_activities')
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, related_name='lesson_activities')
    is_complete = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'lesson activity'
        verbose_name_plural = '03- lesson activities'

    def __str__(self):
        return f'[ {self.user} - {self.course} - {self.lesson} - is-complete: {self.is_complete} ]'

# ============================================================ #

class Topic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, related_name='topics')
    comments = GenericRelation(Comment)
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=256, unique=True)
    content = models.TextField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'topic'
        verbose_name_plural = '04- topics'

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_unique_slug(self, Topic)
        return super(Topic, self).save(*args, **kwargs)

# ============================================================ #

class Enrollment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='enrollments')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'course'], name='unique_enrollment')
        ]
        verbose_name = 'enrollment'
        verbose_name_plural = '05- enrollments'

    def __str__(self):
        return f'{self.user.username} - {self.course.title}'