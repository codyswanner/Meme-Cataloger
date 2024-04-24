"""Handles data uploads; specifically, new file uploads.
Functions in this module

Functions
---------
handle_uploaded_file(file_data)
    Saves an uploaded file to persistent memory.

update_database(file_data)
    Records path and owner of new file to the database.
"""

from .models import *
from django.core.files.uploadedfile import InMemoryUploadedFile


def handle_uploaded_file(file_data):
    """Saves an uploaded file to persistent memory.

    Parameters
    ----------
    file_data: InMemoryUploadedFile
        The file to be uploaded.
    """
    file_name: str = str(file_data.name)
    # TODO: Use BASE_DIR or MEDIA_DIR global variable!
    media_path: str = \
        f'C:\\Users\\codys\\Dev\\PycharmProjects\\Django' \
        f'\\MemeCataloger2\\media\\images\\%s' % file_name
    print(f"Writing file to %s" % media_path)
    with open(media_path, "wb+") as destination:
        for chunk in file_data.chunks():
            destination.write(chunk)
    print("Done writing file!")


def update_database(file_data):
    """Records path and owner of new file to the database.

    Parameters
    ----------
    file_data: InMemoryUploadedFile
        The file to be recorded to the database.
    """
    # Future: add user association for newly uploaded files
    file_path: str = f"images/%s" % file_data.name
    user: AppUser = AppUser.objects.get(id=1)
    new_file: Image = Image(source=file_path, owner=user)
    new_file.save()
    print("Object created in database!")
