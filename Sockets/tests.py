"""Tests for the Channels Websocket Consumer."""
from django.core.exceptions import EmptyResultSet
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
        for i in [1, 2, 3, 5, 7]:  # assign primes to image_1
            ImageTag.objects.create(image_id=image_1, tag_id=Tag.objects.get(id=i))
        for i in range(2, 10, 2):  # assign evens to image_2
            ImageTag.objects.create(image_id=image_2, tag_id=Tag.objects.get(id=i))
        for i in range(3, 10, 3):  # assign multiples of three to image_3
            ImageTag.objects.create(image_id=image_3, tag_id=Tag.objects.get(id=i))

    # def test_FilterConsumer_connect(self):
    #     ...
    #
    # def test_FilterConsumer_disconnect(self):
    #     ...

    def test_FilterConsumer_apply_filters(self):
        """Test that apply_filters returns the correct images."""

        # Should return 1
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [1]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [1])

        # Should return 1 and 2
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [2]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [1, 2])

        # Should return 1 and 3
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [3]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [1, 3])

        # Should return 2
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [4]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [2])

        # Should return 1
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [5]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [1])

        # Should return 2 and 3
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [6]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [2, 3])

        # Should return 1
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [7]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [1])

        # Should return 2
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [8]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [2])

        # Should return 3
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [9]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [3])

        # Should return none
        text_data_1: dict = {'type': 'activeFilters', 'activeFilters': [10]}
        image_result_data: dict = FilterConsumer.apply_filters(text_data_1)
        self.assertEqual(image_result_data['results'], [])

    def test_FilterConsumer_add_tag(self):
        """Tests that tags are added correctly."""

        image_1: Image = Image.objects.get(id=1)
        test_user: AppUser = AppUser.objects.get(username="test_user")
        new_tag: Tag = Tag.objects.create(name="test_add_tag", owner=test_user)

        """Typical scenario: Assigning a new tag to an image"""
        result = FilterConsumer.add_tag(image_1, new_tag.id)

        # make sure the image_tag was created in the database
        try:
            new_imagetag_query = ImageTag.objects.filter(image_id=image_1, tag_id=new_tag)
            if new_imagetag_query.exists():
                # if exists, get object for further testing
                new_imagetag: ImageTag = new_imagetag_query.get()
            else:
                raise EmptyResultSet
        except EmptyResultSet:
            self.fail("Tag association was not created!")

        # check the return is correct as well
        expected_response: dict = {
            'type': 'tagAdded',
            'id': new_imagetag.id,
            'imageId': image_1.id,
            'tagId': new_tag.id
        }
        self.assertEqual(result, expected_response)

        """Atypical scenario: trying to add a tag that's already added"""
        result = FilterConsumer.add_tag(image_1, new_tag.id)
        expected_response = {'type': 'message', 'message': 'This tag association already exists!'}
        self.assertEqual(result, expected_response)

        """Atypical scenario: tag does not exist"""
        result = FilterConsumer.add_tag(image_1, 256)  # non-existent tag id
        expected_response = {'type': 'message', 'message': "Can't add a tag that doesn't exist!"}
        self.assertEqual(result, expected_response)

    def test_FilterConsumer_remove_tag(self):
        """Test that tags are removed correctly."""

        test_user: AppUser = AppUser.objects.get(username="test_user")
        image_1: Image = Image.objects.get(id=1)
        tag_to_remove: Tag = Tag.objects.create(name="remove me!", owner=test_user)
        imagetag_to_delete: ImageTag = ImageTag.objects.create(image_id=image_1, tag_id=tag_to_remove)

        """Typical scenario: remove existing ImageTag"""
        result: dict = FilterConsumer.remove_tag(image_1, tag_to_remove.id)

        # Make sure ImageTag was deleted
        removed_imagetag_query = ImageTag.objects.filter(image_id=image_1, tag_id=tag_to_remove)
        if removed_imagetag_query.exists():
            self.fail("ImageTag should have been deleted!")

        # Check the returned response
        expected_response: dict = {
            'type': 'tagRemoved',
            'id': imagetag_to_delete.id,
            'imageId': image_1.id
        }
        self.assertEqual(result, expected_response)

    # def test_FilterConsumer_create_tag(self):
    #     ...
    #
    # def test_FilterConsumer_update_tags(self):
    #     ...
    #
    # def test_FilterConsumer_delete_image(self):
    #     ...
    #
    # def test_FilterConsumer_update_description(self):
    #     ...
    #
    # def test_FilterConsumer_receive(self):
    #     ...
