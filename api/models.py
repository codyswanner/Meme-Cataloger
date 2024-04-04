from django.db import models


# Create your models here.
class AppUser(models.Model):
    username = models.CharField(max_length=25, unique=True)


class Image(models.Model):
    source = models.ImageField(max_length=1000)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    # TODO: add relation for text descriptions


class Tag(models.Model):
    name = models.CharField(max_length=25)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)


class ImageTag(models.Model):
    image_id = models.ForeignKey(Image, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)
