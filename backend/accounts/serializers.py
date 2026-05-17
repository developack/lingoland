from django.contrib.auth import authenticate
from rest_framework import serializers
from accounts.models import User, UserProfile


class UserRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Passwords do not match')
        return data

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user

# ============================================================ #

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        user = authenticate(email=data['email'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        data['user'] = user
        return data

# ============================================================ #

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('full_name', 'avatar')

# ============================================================ #

class UserDetailSerializer(serializers.ModelSerializer):
    user_profile = UserProfileSerializer()
    is_active = serializers.BooleanField(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'phone', 'user_profile', 'is_active')

    def update(self, instance, validated_data):
        user_profile_data = validated_data.pop('user_profile', None)
        instance = super(UserDetailSerializer, self).update(instance, validated_data)
        if user_profile_data:
            user_profile = instance.user_profile
            user_profile.full_name = user_profile_data.get('full_name', user_profile.full_name)
            user_profile.avatar = user_profile_data.get('avatar', user_profile.avatar)
            user_profile.save()
        return instance
