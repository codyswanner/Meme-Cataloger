"""Tests for the Channels Websocket Consumer."""
from django.core.exceptions import EmptyResultSet
from django.test import TestCase
from unittest.mock import Mock, patch

from Sockets.consumers import FilterConsumer
from api.models import *


class TestSocketConsumer(TestCase):

    def setUp(self):
        self.test_user = AppUser.objects.create(username="test_user")
        self.image_1 = Image.objects.create(
            id=1,
            source="/test-image-1.png",
            owner=self.test_user,
            description="I got some banana bread at work today dude, hell yeah"
        )
        self.image_2 = Image.objects.create(
            id=2,
            source="/test-image-2.jpg",
            owner=self.test_user,
            description="Aw wuold ya luuk at that, anotha loveli dae"  # noqa for spelling
        )
        self.image_3 = Image.objects.create(
            id=3,
            source="/test-image-3.gif",
            owner=self.test_user,
            description="SHE WORE A CROWN AND SHE CAME DOWN IN A BUBBLE, DOUG"
        )
        for i in range(1, 11):
            Tag.objects.create(id=i, name=f"Tag{i}", owner=self.test_user)
        for i in [1, 2, 3, 5, 7]:  # assign primes to image_1
            ImageTag.objects.create(image_id=self.image_1, tag_id=Tag.objects.get(id=i))
        for i in range(2, 10, 2):  # assign evens to image_2
            ImageTag.objects.create(image_id=self.image_2, tag_id=Tag.objects.get(id=i))
        for i in range(3, 10, 3):  # assign multiples of three to image_3
            ImageTag.objects.create(image_id=self.image_3, tag_id=Tag.objects.get(id=i))

    def tearDown(self) -> None:
        """Reset the DB between tests."""
        ImageTag.objects.all().delete()
        Tag.objects.all().delete()
        Image.objects.all().delete()
        AppUser.objects.all().delete()

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

        """Typical scenario: Assigning a new tag to an image"""
        new_tag: Tag = Tag.objects.create(name="test_add_tag", owner=self.test_user)
        result = FilterConsumer.add_tag(self.image_1, new_tag.id)

        # make sure the image_tag was created in the database
        try:
            new_imagetag_query = ImageTag.objects.filter(image_id=self.image_1, tag_id=new_tag)
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
            'imageId': self.image_1.id,
            'tagId': new_tag.id
        }
        self.assertEqual(result, expected_response)

        """Atypical scenario: trying to add a tag that's already added"""
        result = FilterConsumer.add_tag(self.image_1, new_tag.id)
        expected_response = {'type': 'message', 'message': 'This tag association already exists!'}
        self.assertEqual(result, expected_response)

        """Atypical scenario: tag does not exist"""
        result = FilterConsumer.add_tag(self.image_1, 404)  # non-existent tag id
        expected_response = {'type': 'message', 'message': "Can't add a tag that doesn't exist!"}
        self.assertEqual(result, expected_response)

    def test_FilterConsumer_remove_tag(self):
        """Test that tags are removed correctly."""

        tag_to_remove: Tag = Tag.objects.create(name="remove me!", owner=self.test_user)
        imagetag_to_delete: ImageTag = ImageTag.objects.create(image_id=self.image_1, tag_id=tag_to_remove)

        """Typical scenario: remove existing ImageTag"""
        result: dict = FilterConsumer.remove_tag(self.image_1, tag_to_remove.id)

        # Make sure ImageTag was deleted
        removed_imagetag_query = ImageTag.objects.filter(image_id=self.image_1, tag_id=tag_to_remove)
        if removed_imagetag_query.exists():
            self.fail("ImageTag should have been deleted!")

        # Check the returned response
        expected_response: dict = {
            'type': 'tagRemoved',
            'id': imagetag_to_delete.id,
            'imageId': self.image_1.id
        }
        self.assertEqual(result, expected_response)

        """Atypical scenario: attempt to remove a tag that isn't added"""
        result: dict = FilterConsumer.remove_tag(self.image_1, 4)
        expected_response: dict = {'type': 'message', 'message': 'Tag association does not exist!'}
        self.assertEqual(result, expected_response)

        """Atypical scenario: attempt to remove a tag that doesn't exist"""
        result: dict = FilterConsumer.remove_tag(self.image_1, 404)  # nonexistent tag id
        expected_response: dict = {'type': 'message', 'message': "Can't remove a tag that doesn't exist!"}
        self.assertEqual(result, expected_response)

    def test_FilterConsumer_create_tag(self):
        """Test that new Tags are created correctly."""

        result: dict = FilterConsumer().create_tag("new_test_tag", self.test_user)
        new_tag: Tag = Tag.objects.get(name="new_test_tag")
        expected_response: dict = {
            'type': 'tagCreated',
            'id': new_tag.id,
            'name': new_tag.name,
            'owner': self.test_user.id
        }
        self.assertEqual(result, expected_response)

    @patch('Sockets.consumers.FilterConsumer.create_tag')
    @patch('Sockets.consumers.FilterConsumer.remove_tag')
    @patch('Sockets.consumers.FilterConsumer.add_tag')
    def test_FilterConsumer_update_tags(self, mock_add_tag: Mock, mock_remove_tag: Mock, mock_create_tag: Mock):
        """Tests that tags are updated correctly."""

        """Typical case: add existing tag to image"""
        tag_array: list[dict] = [
            {'id': 1, 'label': 'No'},
            {'id': 2, 'label': 'I'},
            {'id': 3, 'label': 'am'},
            {'id': 5, 'label': 'your'},
            {'id': 7, 'label': 'father'},
            {'id': 9, 'label': 'NOOOOOOOOO'}
        ]
        input_message: dict = {
            'type': 'updateTags',
            'imageId': 1,  # image_1
            'tagArray': tag_array,  # "9" was added
            'user': self.test_user.id
        }
        mock_add_tag.return_value = {
            'type': 'tagAdded',
            'id': 999,  # fake imageTag id
            'imageId': 1,  # image_1
            'tagId': 9  # id of the newly added tag
        }
        result = FilterConsumer().update_tags(input_message)
        expected_response = [mock_add_tag.return_value]
        self.assertEqual(result, expected_response)

        """Typical case: remove existing tag from image"""
        tag_array: list[dict] = [
            {'id': 1, 'label': 'This'},
            {'id': 3, 'label': 'is'},
            {'id': 5, 'label': 'the'},
            {'id': 7, 'label': 'way'}
        ]
        input_message: dict = {
            'type': 'updateTags',
            'imageId': 1,  # image_1
            'tagArray': tag_array,  # "2" was removed
            'user': self.test_user.id
        }
        mock_remove_tag.return_value = {
            'type': 'tagRemoved',
            'id': 998,  # fake imageTag id
            'imageId': 1  # image_1
        }
        result = FilterConsumer().update_tags(input_message)
        expected_response = [mock_remove_tag.return_value]
        self.assertEqual(result, expected_response)

        """Typical case: create new tag and apply to image"""
        tag_array: list[dict] = [
            {'id': 1, 'label': 'This'},
            {'id': 2, 'label': 'is'},
            {'id': 3, 'label': 'getting'},
            {'id': 5, 'label': 'out'},
            {'id': 7, 'label': 'of'},
            {'id': 'newTag1', 'label': 'hand'}
        ]
        input_message: dict = {
            'type': 'updateTags',
            'imageId': 1,  # image_1
            'tagArray': tag_array,  # "11" to be created
            'user': self.test_user.id
        }
        mock_create_tag.return_value = {
            'type': 'tagCreated',
            'id': 256,  # making up an id
            'name': 1,
            'owner': self.test_user.id
        }
        mock_add_tag.return_value = {
            'type': 'tagAdded',
            'id': 997,
            'imageId': 1,  # image_1
            'tagId': 256  # match with mock_create_tag.return_value
        }
        result = FilterConsumer().update_tags(input_message)
        expected_response = [mock_create_tag.return_value, mock_add_tag.return_value]
        self.assertEqual(result, expected_response)

    # def test_FilterConsumer_delete_image(self):
    #     ...
    #
    # def test_FilterConsumer_update_description(self):
    #     ...
    #
    # def test_FilterConsumer_receive(self):
    #     ...
