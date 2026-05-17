from django.contrib import admin
from articles.models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'slug', 'created')
    exclude = ('slug',)