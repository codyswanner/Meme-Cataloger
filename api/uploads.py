from .models import *


def handle_uploaded_file(file_data):
    file_name = str(file_data.name)
    media_path = \
        f'C:\\Users\\codys\\Dev\\PycharmProjects\\Django' \
        f'\\MemeCataloger2\\media\\images\\%s' % file_name
    print(f"Writing file to %s" % media_path)
    with open(media_path, "wb+") as destination:
        for chunk in file_data.chunks():
            destination.write(chunk)
    print("Done writing file!")


def update_database(file_data):
    # add user association for newly uploaded files
    file_path = f"images/%s" % file_data.name
    user = AppUser.objects.get(id=1)
    new_file = Image(source=file_path, owner=user)
    new_file.save()
    print("Object created in database!")
