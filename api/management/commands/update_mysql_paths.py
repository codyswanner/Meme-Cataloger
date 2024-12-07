from django.core.management.base import BaseCommand
from api.models import Image
import os


class Command(BaseCommand):

    def handle(self, *args, **options):
        directory = 'media/images/'
        filenames = os.listdir(directory)

        for filename in filenames:
            if not Image.objects.filter(source=f'images/{filename}').exists():
                new_image_path = Image(source=f'images/{filename}', owner_id=1)
                new_image_path.save()
