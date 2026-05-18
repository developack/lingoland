from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from accounts.models import User, UserProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'email', 'is_active', 'is_superuser')
    fieldsets = (
        ('Personal Info', {'fields': ('email', 'username', 'phone', 'password', 'first_name', 'last_name')}),
        ('Role And Capabilities', {'fields': ('groups', 'user_permissions')}),
        ('Access Control', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Activity Info', {'fields': ('last_login', 'date_joined', 'updated')})
    )
    add_fieldsets = (
        ('Personal Info', {'fields': ('email', 'username', 'phone', 'password', 'first_name', 'last_name')}),
        ('Role And Capabilities', {'fields': ('groups', 'user_permissions')}),
        ('Access Control', {'fields': ('is_active', 'is_staff', 'is_superuser')})
    )
    readonly_fields = ('updated',)

# ============================================================ #

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'full_name', 'created')
    exclude = ('created', 'updated')