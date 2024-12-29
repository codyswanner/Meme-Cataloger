"""Handles data uploads; specifically, new file uploads.
Functions in this module

Functions
---------
handle_uploaded_file(file_data)
    Saves an uploaded file to persistent memory.

update_database(file_data)
    Records path and owner of new file to the database.
"""

import filetype
from .models import AppUser, Image
from django.conf import settings


class FileTypeError(TypeError):
    """This file type is not accepted for upload."""


def validate_filetype(file):
    image_match = filetype.image_match(file)
    video_match = filetype.video_match(file)
    if not image_match and not video_match:
        raise FileTypeError
    return True  # file is valid filetype for upload


def handle_uploaded_file(file_data):
    """Saves an uploaded file to persistent memory.

    Parameters
    ----------
    file_data: InMemoryUploadedFile
        The file to be uploaded.
    """

    file_name: str = str(file_data.name)
    app_media_root: str = settings.MEDIA_ROOT
    media_path: str = \
        f'{app_media_root}/images/{file_name}'
    with open(media_path, "wb+") as destination:
        for chunk in file_data.chunks():
            destination.write(chunk)
    print("Done writing file!")


def update_database(file_data, user):
    """Records path and owner of new file to the database.

    Parameters
    ----------
    file_data: InMemoryUploadedFile
        The file to be recorded to the database.

    user: AppUser
        The user to be assigned ownership of the file.
    """

    file_path: str = f"images/{file_data.name}"
    new_file: Image = Image(source=file_path, owner=user)
    new_file.save()
    print("Object created in database!")
