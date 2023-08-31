from rest_framework import serializers
from .models import AppUser, Image, Tag, ImageTag


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ImageTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageTag
        fields = '__all__'
