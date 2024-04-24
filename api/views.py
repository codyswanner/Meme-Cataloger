"""Defines views for the app, which are informational, or "uploads."
    Informational views give a clear look at data such as Users,
    Images, Tags, and ImageTags.
    The "uploads" view provides a target for uploaded files to be
    loaded and saved into the Django server.

Classes
-------
[class]View
    Exposes API-delivered [class] information.
    For example, ImageView exposes data from class api.models.Image.
    Includes: AppUserView, ImageView, TagView, ImageTagView.

Functions
---------
upload(request: ASGIRequest) -> HttpResponse
    Uploads a new file to persistent storage and the database.
"""

from django.http import HttpResponse
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from .serializers import *
from .uploads import *
# Imports below are for TypeHints
# noinspection PyUnresolvedReferences
from django.core.files.uploadedfile import InMemoryUploadedFile
# noinspection PyUnresolvedReferences
from django.core.handlers.asgi import ASGIRequest
# noinspection PyUnresolvedReferences
from django.db.models.query import QuerySet


# Create your views here.
class AppUserView(generics.ListCreateAPIView):
    """AppUserView
    Exposes API-delivered AppUser information.
    See api.models.AppUser for details.
    """

    queryset: QuerySet = AppUser.objects.all()
    serializer_class = AppUserSerializer
    renderer_classes = [JSONRenderer]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data = {"message": "User created successfully."}
        return response


class ImageView(generics.ListAPIView):
    """ImageView
    Exposes API-delivered Image information.
    See api.models.Image for details.
    """

    queryset: QuerySet = Image.objects.all()
    serializer_class = ImageSerializer
    renderer_classes = [JSONRenderer]


class TagView(generics.ListAPIView):
    """TagView
    Exposes API-delivered Tag information.
    See api.models.Tag for details.
    """

    queryset: QuerySet = Tag.objects.all()
    serializer_class = TagSerializer
    renderer_classes = [JSONRenderer]


class ImageTagView(generics.ListAPIView):
    """ImageTagView
    Exposes API-delivered ImageTag information.
    See api.models.ImageTag for details.
    """

    queryset: QuerySet = ImageTag.objects.all()
    serializer_class = ImageTagSerializer
    renderer_classes = [JSONRenderer]


def upload(request: ASGIRequest) -> HttpResponse:
    """Uploads a new file to persistent storage and the database.

    Parameters
    ----------
    request: ASGIRequest
        Request from frontend, including file(s) to be uploaded.

    Returns
    -------
    HttpResponse
        Django server response to request.
        On success, returns status 200.
    """

    print(type(request))
    form_data: list = list(request.FILES.values())
    print("Received form data!")
    print(form_data)
    file_data: InMemoryUploadedFile = form_data[0]
    print(file_data)
    # TODO: check each operation before commit
    print("Handing to upload handler...")
    handle_uploaded_file(file_data)
    print("Updating database records...")
    update_database(file_data)
    print("Done uploading file!")

    return HttpResponse(status=200)
