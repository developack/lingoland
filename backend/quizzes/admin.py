from django.contrib import admin
from quizzes.models import Quiz, Question, Choice, QuizAttempt


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'lesson', 'title', 'slug', 'created')
    exclude = ('slug', )

# ============================================================ #

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('quiz', 'title', 'slug', 'created')
    exclude = ('slug', )

# ============================================================ #

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('question', 'text', 'is_correct', 'created')

# ============================================================ #

@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'total_questions', 'correct_answers', 'created')