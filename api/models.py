"""Django Models to manage users, images and tags.

Classes
-------

AppUser
    Identifies a user of the app.
    Extends Django's model.Model class.

Image
    Identifies an Image (or other media).
    Extends Django's model.Model class.

    This class models information for source, owner and description
    of an image (or other media) in the app.  This information is
    then used to match up a path in permanent storage with the user
    who owns that media and the description of that media stored in
    the database.

Tag
    Identifies a Tag (that can be assigned to an Image).
    Extends Django's model.Model class.

    This class models information about a tag that may be assigned
    to an object of the Image class (via the ImageTag class).

ImageTag
    Identifies an association between an Image object and a Tag object.
    Extends Django's model.Model class.

    Objects of this class represent an association between an Image
    and a Tag; in other words, any time a Tag is assigned to an Image,
    and ImageTag is created to signify this relationship.
"""

from django.db import models


# Create your models here.
class AppUser(models.Model):
    """Identifies a user of the app.
    Extends Django's model.Model class.

    Attributes
    ----------
    username: str
        The user-defined screen name.
    """

    username = models.CharField(max_length=25, unique=True)


class Image(models.Model):
    """Identifies an Image (or other media).
    Extends Django's model.Model class.

    This class models information for source, owner and description
    of an image (or other media) in the app.  This information is
    then used to match up a path in permanent storage with the user
    who owns that media and the description of that media stored in
    the database.

    Attributes
    ----------
    source: str
        The path on persistent storage of the Image.
    owner: AppUser
    description: str
        A user-defined text description of the media.
    """

    source = models.ImageField(max_length=1000)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    description = models.CharField(max_length=1400, default='')


class Tag(models.Model):
    """Identifies a Tag (that can be assigned to an Image).
    Extends Django's model.Model class.

    This class models information about a tag that may be assigned
    to an object of the Image class (via the ImageTag class).

    Attributes
    ----------
    name: str
        The name of the tag as it will appear to the user.
    owner: AppUser
    """

    name = models.CharField(max_length=25)
    owner = models.ForeignKey(AppUser, on_delete=models.CASCADE)


class ImageTag(models.Model):
    """Identifies an association between an Image object and a Tag object.
    Extends Django's model.Model class.

    Objects of this class represent an association between an Image
    and a Tag; in other words, any time a Tag is assigned to an Image,
    and ImageTag is created to signify this relationship.

    Attributes
    ----------
    image_id: Image
    tag_id: Tag
    """

    image_id = models.ForeignKey(Image, on_delete=models.CASCADE)
    tag_id = models.ForeignKey(Tag, on_delete=models.CASCADE)
