import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.managers import UserManager


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=11, unique=True, null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = UserManager()

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "01- users"

    def __str__(self):
        return f'{self.username}'

# ============================================================ #

class UserProfile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, related_name='user_profile')
    full_name = models.CharField(max_length=256, default='None')
    avatar = models.ImageField(upload_to='accounts/avatar/', null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "user profile"
        verbose_name_plural = "02- user profiles"

    def __str__(self):
        return f'{self.user.username} - {self.full_name}'