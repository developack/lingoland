from django.contrib import admin
from courses.models import Course, Lesson, LessonActivity, Topic, Enrollment


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'slug', 'price', 'created', 'updated')
    exclude = ('slug',)

# ============================================================ #

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'course', 'slug', 'created', 'updated')
    exclude = ('slug',)

# ============================================================ #

@admin.register(LessonActivity)
class LessonActivityAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'lesson', 'is_complete', 'created')

# ============================================================ #

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'lesson', 'slug', 'created', 'updated')
    exclude = ('slug',)

# ============================================================ #

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'created')