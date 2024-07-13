"""Allows serialization of DB data for API delivery to frontend.
Each class in this module is called in api.views (only).

Classes
-------
[class]Serializer
    Each of these serializes data of [class],
    for instance "ImageSerializer" calls data
    from the Image class (see api.models).
    Extends Django's serializers.ModelSerializer.
"""

from rest_framework import serializers
from .models import AppUser, Image, Tag, ImageTag


class AppUserSerializer(serializers.ModelSerializer):
    """Serializes data from the AppUser class for API delivery.
    Extends Django's serializers.ModelSerializer.
    Used in api.views.
    """

    class Meta:
        model = AppUser
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    """Serializes data from the Image class for API delivery.
    Extends Django's serializers.ModelSerializer.
    Used in api.views.
    """

    class Meta:
        model = Image
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    """Serializes data from the Tag class for API delivery.
    Extends Django's serializers.ModelSerializer.
    Used in api.views.
    """

    class Meta:
        model = Tag
        fields = '__all__'


class ImageTagSerializer(serializers.ModelSerializer):
    """Serializes data from the ImageTag class for API delivery.
    Extends Django's serializers.ModelSerializer.
    Used in api.views.
    """

    class Meta:
        model = ImageTag
        fields = '__all__'
