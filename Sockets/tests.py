"""Tests for the Channels Websocket Consumer."""
import os
from pathlib import Path
from django.core.exceptions import EmptyResultSet
from django.test import TestCase
from django.conf import settings
from unittest.mock import Mock, patch

from Sockets.consumers import FilterConsumer
from api.models import AppUser, Image, Tag, ImageTag


class TestSocketConsumer(TestCase):
    """Shared setup methods for testing FilterConsumer class.

    Meant to be inherited by classes that test methods of consumers.FilterConsumer."""
    def setUp(self) -> None:
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


class TestConnectDisconnect(TestSocketConsumer):
    ...
    # def test_FilterConsumer_connect(self):
    #     ...
    #
    # def test_FilterConsumer_disconnect(self):
    #     ...


class TestFilterExact(TestSocketConsumer):
    """Test that filter_exact returns the correct images."""

    def test_typical_case_1(self):
        # Should return 1
        text_data_1: dict = {
            'type': 'activeFilters',
            'activeFilters': [1, 2, 3, 5, 7],
            'exactMatch': True
        }
        result: dict = FilterConsumer().apply_filters(text_data_1)
        self.assertEqual(result['imageResults'], [1])
    
    def test_typical_case_2(self):
        # Should return 2
        text_data_2: dict = {
            'type': 'activeFilters',
            'activeFilters': [2, 4, 6, 8],
            'exactMatch': True
        }
        result: dict = FilterConsumer().apply_filters(text_data_2)
        self.assertEqual(result['imageResults'], [2])
    
    def test_typical_case_3(self):
        # Should return 3
        text_data_3: dict = {
            'type': 'activeFilters',
            'activeFilters': [3, 6, 9],
            'exactMatch': True
        }
        result: dict = FilterConsumer().apply_filters(text_data_3)
        self.assertEqual(result['imageResults'], [3])

    
    def test_typical_case_4(self):
        # Should return none
        text_data_4: dict = {
            'type': 'activeFilters',
            'activeFilters': [1],
            'exactMatch': True
        }
        result: dict = FilterConsumer().apply_filters(text_data_4)
        self.assertEqual(result['imageResults'], [])
    
    def test_typical_case_5(self):
        # Should return none
        text_data_5: dict = {
            'type': 'activeFilters',
            'activeFilters': [2],
            'exactMatch': True
        }
        result: dict = FilterConsumer().apply_filters(text_data_5)
        self.assertEqual(result['imageResults'], [])
    
    def test_typical_case_6(self):
        # Should return none
        text_data_6: dict = {
            'type': 'activeFilters',
            'activeFilters': [3],
            'exactMatch': True
        }
        result: dict = FilterConsumer().apply_filters(text_data_6)
        self.assertEqual(result['imageResults'], [])


class TestApplyFilters(TestSocketConsumer):
    """Test that apply_filters returns the correct images."""

    def test_typical_case_1(self):
        # Should return 1
        text_data_1: dict = {
            'type': 'activeFilters',
            'activeFilters': [1],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_1)
        self.assertEqual(result['imageResults'], [1])

    def test_typical_case_2(self):
        # Should return 1 and 2
        text_data_2: dict = {
            'type': 'activeFilters',
            'activeFilters': [2],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_2)
        self.assertEqual(result['imageResults'], [1, 2])

    def test_typical_case_3(self):
        # Should return 1 and 3
        text_data_3: dict = {
            'type': 'activeFilters',
            'activeFilters': [3],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_3)
        self.assertEqual(result['imageResults'], [1, 3])

    def test_typical_case_4(self):
        # Should return 2
        text_data_4: dict = {
            'type': 'activeFilters',
            'activeFilters': [4],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_4)
        self.assertEqual(result['imageResults'], [2])

    def test_typical_case_5(self):
        # Should return 1
        text_data_5: dict = {
            'type': 'activeFilters',
            'activeFilters': [5],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_5)
        self.assertEqual(result['imageResults'], [1])

    def test_typical_case_6(self):
        # Should return 2 and 3
        text_data_6: dict = {
            'type': 'activeFilters',
            'activeFilters': [6],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_6)
        self.assertEqual(result['imageResults'], [2, 3])

    def test_typical_case_7(self):
        # Should return 1
        text_data_7: dict = {
            'type': 'activeFilters',
            'activeFilters': [7],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_7)
        self.assertEqual(result['imageResults'], [1])

    def test_typical_case_8(self):
        # Should return 2
        text_data_8: dict = {
            'type': 'activeFilters',
            'activeFilters': [8],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_8)
        self.assertEqual(result['imageResults'], [2])

    def test_typical_case_9(self):
        # Should return 3
        text_data_9: dict = {
            'type': 'activeFilters',
            'activeFilters': [9],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_9)
        self.assertEqual(result['imageResults'], [3])

    def test_typical_case_10(self):
        # Should return none
        text_data_10: dict = {
            'type': 'activeFilters',
            'activeFilters': [10],
            'exactMatch': False
        }
        result: dict = FilterConsumer().apply_filters(text_data_10)
        self.assertEqual(result['imageResults'], [])


class TestAddTag(TestSocketConsumer):

    def setUp(self):
        super().setUp()
        self.new_tag: Tag = Tag.objects.create(name="test_add_tag", owner=self.test_user)

    def test_typical_case(self):
        """Typical case: Assigning a new tag to an image"""
        result = FilterConsumer.add_tag(self.image_1, self.new_tag.id)

        # make sure the image_tag was created in the database
        try:
            new_imagetag_query = ImageTag.objects.filter(image_id=self.image_1, tag_id=self.new_tag)
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
            'tagId': self.new_tag.id
        }
        self.assertEqual(result, expected_response)

    def test_tag_already_added(self):
        """Atypical case: trying to add a tag that's already added"""
        result = FilterConsumer.add_tag(self.image_1, 1)
        expected_response = {'type': 'message', 'message': 'This tag association already exists!'}
        self.assertEqual(result, expected_response)

    def test_tag_does_not_exist(self):
        """Atypical case: tag does not exist"""
        result = FilterConsumer.add_tag(self.image_1, 404)  # non-existent tag id
        expected_response = {'type': 'message', 'message': "Can't add a tag that doesn't exist!"}
        self.assertEqual(result, expected_response)


class TestRemoveTag(TestSocketConsumer):
    """Test that tags are removed correctly."""

    def setUp(self):
        super().setUp()
        self.tag_to_remove: Tag = Tag.objects.create(name="remove me!", owner=self.test_user)
        self.imagetag_to_delete: ImageTag = ImageTag.objects.create(image_id=self.image_1, tag_id=self.tag_to_remove)

    def test_typical_case(self):
        """Typical scenario: remove existing ImageTag"""
        result: dict = FilterConsumer.remove_tag(self.image_1, self.tag_to_remove.id)

        # Make sure ImageTag was deleted
        removed_imagetag_query = ImageTag.objects.filter(image_id=self.image_1, tag_id=self.tag_to_remove)
        if removed_imagetag_query.exists():
            self.fail("ImageTag should have been deleted!")

        # Check the returned response
        expected_response: dict = {
            'type': 'tagRemoved',
            'id': self.imagetag_to_delete.id,
            'imageId': self.image_1.id
        }
        self.assertEqual(result, expected_response)

    def test_tag_not_on_image(self):
        """Atypical scenario: attempt to remove a tag that isn't added"""
        result: dict = FilterConsumer.remove_tag(self.image_1, 4)
        expected_response: dict = {'type': 'message', 'message': 'Tag association does not exist!'}
        self.assertEqual(result, expected_response)

    def test_tag_does_not_exist(self):
        """Atypical scenario: attempt to remove a tag that doesn't exist"""
        result: dict = FilterConsumer.remove_tag(self.image_1, 404)  # nonexistent tag id
        expected_response: dict = {'type': 'message', 'message': "Can't remove a tag that doesn't exist!"}
        self.assertEqual(result, expected_response)


class TestCreateTag(TestSocketConsumer):
    """Test that new Tags are created correctly."""

    def test_typical_case(self):
        result: dict = FilterConsumer().create_tag("new_test_tag", self.test_user)
        new_tag: Tag = Tag.objects.get(name="new_test_tag")
        expected_response: dict = {
            'type': 'tagCreated',
            'id': new_tag.id,
            'name': new_tag.name,
            'owner': self.test_user.id
        }
        self.assertEqual(result, expected_response)


class TestUpdateTags(TestSocketConsumer):

    @patch('Sockets.consumers.FilterConsumer.add_tag')
    def test_typical_add_tag(self, mock_add_tag: Mock):
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
        mock_add_tag.assert_called_once()

    @patch('Sockets.consumers.FilterConsumer.remove_tag')
    def test_typical_remove_tag(self, mock_remove_tag: Mock):
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
        mock_remove_tag.assert_called_once()

    @patch('Sockets.consumers.FilterConsumer.create_tag')
    @patch('Sockets.consumers.FilterConsumer.add_tag')
    def test_typical_create_tag(self, mock_add_tag: Mock, mock_create_tag: Mock):
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
        mock_create_tag.assert_called_once()

    def test_user_does_not_exist(self):
        input_message: dict = {
            'type': 'updateTags',
            'imageId': 1,  # image_1
            'tagArray': [],  # test won't get this far
            'user': 404  # non-existent user
        }
        result: list = FilterConsumer().update_tags(input_message)
        expected_response: list = [{
            'type': 'message',
            'message': 'Specified user does not exist!'
        }]
        self.assertEqual(result, expected_response)

    def test_image_does_not_exist(self):
        input_message: dict = {
            'type': 'updateTags',
            'imageId': 404,  # non-existent image
            'tagArray': [],  # test won't get this far
            'user': self.test_user.id
        }
        result: list = FilterConsumer().update_tags(input_message)
        expected_response: list = [{
            'type': 'message',
            'message': 'Specified image does not exist!'
        }]
        self.assertEqual(result, expected_response)


class TestDeleteImage(TestSocketConsumer):

    def test_typical_case(self):
        """Tests that images are deleted properly."""

        """Typical case: delete an existing image from storage and DB"""

        mock_file: Mock = Mock()
        mock_file.name = "images/test_file.webp"
        mock_file.src = (
            b"52494646be000000574542505650384c0d0a0055000000c4401e32"
            b"0500000070bf17f57c9f0412003c078000100c28064000a24b0e52"
            b"a0002000000004600"
        )
        app_media_root: str = settings.MEDIA_ROOT
        file = open(f"{app_media_root}/{mock_file.name}", "w+b")
        file.write(mock_file.src)
        file.close()
        Image.objects.create(
            id=100,
            source=f"{mock_file.name}",
            owner=self.test_user
        )

        # Pass in Image id
        input_message: dict = {
            'type': 'deleteImage',
            'imageId': '100'
        }
        result: dict = FilterConsumer.delete_image(input_message)
        expected_response: dict = {
            'type': 'imageDeleted',
            'id': '100'
        }
        self.assertEqual(result, expected_response)

        # Method deletes image from storage
        self.assertFalse(Path(f"{app_media_root}/{mock_file.name}").is_file())

        # Method removes image name from database
        self.assertFalse(Image.objects.filter(id=100).exists())

    def test_database_record_does_not_exist(self):
        mock_file: Mock = Mock()
        mock_file.name = "images/test_file.webp"
        mock_file.src = (
            b"52494646be000000574542505650384c0d0a0055000000c4401e32"
            b"0500000070bf17f57c9f0412003c078000100c28064000a24b0e52"
            b"a0002000000004600"
        )
        app_media_root: str = settings.MEDIA_ROOT
        file = open(f"{app_media_root}/{mock_file.name}", "w+b")
        file.write(mock_file.src)
        file.close()

        # Skip object creation to raise error
        # Image.objects.create(
        #     id=100,
        #     source=f"{mock_file.name}",
        #     owner=self.test_user
        # )

        # Pass in Image id
        input_message: dict = {
            'type': 'deleteImage',
            'imageId': '100'
        }
        result: dict = FilterConsumer.delete_image(input_message)
        expected_response: dict = {
            'type': 'message',
            'message': 'Specified image does not exist!'
        }
        self.assertEqual(result, expected_response)

        # clean up created file
        os.remove(f'{app_media_root}/{mock_file.name}')

    def test_image_file_does_not_exist(self):
        mock_file: Mock = Mock()
        mock_file.name = "images/test_file.webp"

        # Skip creation of actual file to induce error
        # mock_file.src = (
        #     b"52494646be000000574542505650384c0d0a0055000000c4401e32"
        #     b"0500000070bf17f57c9f0412003c078000100c28064000a24b0e52"
        #     b"a0002000000004600"
        # )
        # app_media_root: str = settings.MEDIA_ROOT
        # file = open(f"{app_media_root}/{mock_file.name}", "w+b")
        # file.write(mock_file.src)
        # file.close()
        Image.objects.create(
            id=100,
            source=f"{mock_file.name}",
            owner=self.test_user
        )

        # Pass in Image id
        input_message: dict = {
            'type': 'deleteImage',
            'imageId': '100'
        }
        result: dict = FilterConsumer.delete_image(input_message)
        expected_response: dict = {
            'type': 'message',
            'message': 'File images/test_file.webp not found!'
        }
        self.assertEqual(result, expected_response)


class TestSendMessage(TestSocketConsumer):
    ...

    # def test_send_message(self):
    #     ...


class TestReceive(TestSocketConsumer):
    ...

    # def test_receive_message(self):
    #     ...
    #
    # def test_receive_filterChange(self):
    #     ...
    #
    # def test_receive_activeFilters(self):
    #     ...
    #
    # def test_receive_updateTags(self):
    #     ...
    #
    # def test_receive_deleteImage(self):
    #     ...
    #
    # def test_receive_updateDescription(self):
    #     ...
    #
    # def test_receive_unexpected(self):
    #     ...
