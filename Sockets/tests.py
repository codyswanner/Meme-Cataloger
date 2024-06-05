"""Tests for the Channels Websocket Consumer."""

from django.test import TestCase

from Sockets.consumers import FilterConsumer
from api.models import *


class TestSocketConsumer(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        test_user = AppUser.objects.create(username="test_user")
        image_1 = Image.objects.create(
            source="/test-image-1.png",
            owner=test_user,
            description="I got some banana bread at work today dude, hell yeah"
        )
        image_2 = Image.objects.create(
            source="/test-image-2.jpg",
            owner=test_user,
            description="Aw wuold ya luuk at that, anotha loveli dae"
        )
        image_3 = Image.objects.create(
            source="/test-image-3.gif",
            owner=test_user,
            description="SHE WORE A CROWN AND SHE CAME DOWN IN A BUBBLE, DOUG"
        )
        for i in range(0, 10):
            Tag.objects.create(name=f"Tag{i}", owner=test_user)
        for i in [1, 3, 5, 7]:
            ImageTag.objects.create(image_id=image_1, tag_id=Tag.objects.get(id=i))
        for i in range(1, 11, 2):
            ImageTag.objects.create(image_id=image_2, tag_id=Tag.objects.get(id=i))
        for i in range(1, 11, 3):
            ImageTag.objects.create(image_id=image_3, tag_id=Tag.objects.get(id=i))

    def test_unittest(self):
        self.assertTrue(True)

    def test_setup(self):
        image_1 = Image.objects.get(id=1)
        image_2 = Image.objects.get(id=2)
        self.assertEqual(image_1, image_1)
        self.assertNotEqual(image_1, image_2)

    def test_FilterConsumer_connect(self):
        ...

    def test_FilterConsumer_disconnect(self):
        ...

    def test_FilterConsumer_apply_filters(self):
        ...

    def test_FilterConsumer_add_tag(self):
        ...

    def test_FilterConsumer_remove_tag(self):
        ...

    def test_FilterConsumer_create_tag(self):
        ...

    def test_FilterConsumer_update_tags(self):
        ...

    def test_FilterConsumer_delete_image(self):
        ...

    def test_FilterConsumer_update_description(self):
        ...

    def test_FilterConsumer_receive(self):
        ...
