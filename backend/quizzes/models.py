import uuid
from django.db import models
from utils.utils import Utils
from accounts.models import User
from courses.models import Course, Lesson


class Quiz(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='quizzes')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, related_name='quizzes')
    lesson = models.ForeignKey(Lesson, on_delete=models.SET_NULL, null=True, related_name='quizzes')
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=256, unique=True)
    content = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'quiz'
        verbose_name_plural = '01- quizzes'

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_unique_slug(self, Quiz)
        return super(Quiz, self).save(*args, **kwargs)

# ============================================================ #

class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.SET_NULL, null=True, related_name='questions')
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=256, unique=True)
    content = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'question'
        verbose_name_plural = '02- questions'

    def __str__(self):
        return f'{self.title}'

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = Utils.generate_unique_slug(self, Question)
        return super(Question, self).save(*args, **kwargs)

# ============================================================ #

class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(Question, on_delete=models.SET_NULL, null=True, related_name='choices')
    text = models.CharField(max_length=256)
    is_correct = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'choice'
        verbose_name_plural = '03- choices'

    def __str__(self):
        return f'{self.question} - {self.text} - {self.is_correct}'

# ============================================================ #

class QuizAttempt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='quiz_attempts')
    quiz = models.ForeignKey(Quiz, on_delete=models.SET_NULL, null=True, related_name='quiz_attempts')
    total_questions = models.IntegerField(default=0)
    correct_answers = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'quiz attempt'
        verbose_name_plural = '04- quiz attempts'

    def __str__(self):
        return f'[ {self.user} - {self.quiz} - {self.correct_answers} / {self.total_questions} correct answers ]'

    def save(self, *args, **kwargs):
        if not self.total_questions:
            self.total_questions = self.quiz.questions.count()
        return super(QuizAttempt, self).save(*args, **kwargs)