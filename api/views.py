from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import *
from .models import *
from .uploads import *


# Create your views here.
class UserView(generics.ListCreateAPIView):
    queryset = AppUser.objects.all()
    serializer_class = AppUserSerializer
    renderer_classes = [JSONRenderer]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {"message": "User created successfully."}
        return response


class ImageView(generics.ListAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    renderer_classes = [JSONRenderer]


class TagView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    renderer_classes = [JSONRenderer]


class ImageTagView(generics.ListAPIView):
    queryset = ImageTag.objects.all()
    serializer_class = ImageTagSerializer
    renderer_classes = [JSONRenderer]


def upload(request):
    form_data = list(request.FILES.values())
    print("Received form data!")
    print(form_data)
    file_data = form_data[0]
    print(file_data)
    print("Handing to upload handler...")
    handle_uploaded_file(file_data)
    print("Updating database records...")
    update_database(file_data)
    print("Done uploading file!")

    return HttpResponse(status=200)
