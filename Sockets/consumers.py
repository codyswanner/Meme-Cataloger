"""WebSocket Consumers to handle messages between client and backend.

Includes FilterConsumer class, the methods of which handle WebSocket
messages from the frontend, including any processing, database calls,
and responses back to client.

https://channels.readthedocs.io/
"""

import os
import re
import json
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from asgiref.sync import async_to_sync
from django.db.models.query import QuerySet
from channels.generic.websocket import WebsocketConsumer

from api.models import AppUser, Image, Tag, ImageTag


class FilterConsumer(WebsocketConsumer):
    """Contains methods to handle WebSocket messages between client and backend.

    Attributes
    ----------
    user_id: int
        Used for user identification (feature not yet implemented)
    layer_name: str
        Identifies the channel layer for WebSocket messages.

    Methods
    -------
    __init__(self, *args, **kwargs)
        Extends WebsocketConsumer class from channels for Django package.
    connect(self) -> None
        Initializes connection by creating and joining channel layer group.
        (In the future, this method may also handle user/session identification.)
    disconnect(self, code: int) -> None
        Cleans up connection; no current functionality.
        In the future this method will clean up any sessions or other
        leftover structures that were created by the connect method.
    filter_change(self, text_data_json: dict) -> None
        On filter change request from client, triggers filter change activity.
        Future change: this method seems redundant/roundabout.  Can it be removed?
    apply_filters(self, text_data_json: dict) -> None
        Queries DB for objects matching filter array, and passes this list back to the client.
    add_tag(self, text_data_json: dict) -> None
        Creates ImageTag association from request received from client for new tag on image.
    remove_tag(self, text_data_json: dict) -> None
        Deletes ImageTag association of tag on image specified by client.
    delete_image(self, text_data_json: dict) -> None
        Deletes image from persistent storage, and removes record from database.
        Future change: check for existence of both file and DB entry before performing action
        Future change: Move image to "Trash" folder rather than deleting immediately
    update_description(text_data_json: dict) -> None
        Updates description on image (in database) as specified by client.  Static method.
    receive(self, text_data: str = None, bytes_data: bytes = None)
        Routes incoming messages by type to the proper method for handling.
    """

    def __init__(self, *args, **kwargs) -> None:
        """Extends WebsocketConsumer from channels for Django package.

        Attributes
        ----------
        user_id: int
            Used for user identification (feature not yet implemented)
        layer_name: str
            Identifies the channel layer for WebSocket messages.
        """

        super().__init__(args, kwargs)
        self.user_id: int | None = None
        self.layer_name: str | None = None

    def connect(self) -> None:
        """Initializes connection by creating and joining channel layer group.

        In the future, this method may also handle user/session identification.
        """

        self.user_id = 1  # Feature not yet implemented; only user is test_user, id=1
        self.layer_name = f"{self.user_id}_gallery"

        # Join channel layer
        async_to_sync(self.channel_layer.group_add)(
            self.layer_name, self.channel_name  # noqa for false warning
        )

        self.accept()

    def disconnect(self, code: int) -> None:
        """Cleans up connection; no current functionality.

        In the future this method will clean up any sessions or other
        leftover structures that were created by the connect method.
        """

        # Leave channel layer?
        pass

    @staticmethod
    def apply_filters(text_data_json: dict) -> dict:
        """Queries DB for objects matching filter array, and passes this list back to the client.

        Parameters
        ----------
         text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For apply_filters, expected structure is:
            {
                'type': 'activeFilters',
                'activeFilters': (numerical filter ids as a list of strings)
            }

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
            {
                'type': 'applyFilters',
                'filters': (the filters that were passed in),
                'imageResults': (list of matching images),
                'associatedTags': {list of tags of matching images)
            }
        """

        active_filters: list = text_data_json['activeFilters']
        image_queryset: QuerySet = Image.objects.all()
        image_results: list = []
        associated_tags: list = []  # tags on images in image_results
        for f in active_filters:
            image_queryset = image_queryset.filter(imagetag__tag_id=f)
        for image in image_queryset:
            # collect tag IDs associated with image
            imagetags_query: QuerySet = ImageTag.objects.filter(image_id=image.id)
            tags_list: list = [image_tag.tag_id for image_tag in imagetags_query]
            # if tag IDs are not in list, append them
            for tag in tags_list:
                if tag.id not in associated_tags:
                    associated_tags.append(tag.id)
                    print(f"Added {tag.id}!")

        for result in image_queryset:
            image_results.append(result.id)

        response_message: dict = {
            'type': 'applyFilters',
            'filters': active_filters,
            'imageResults': image_results,
            'associatedTags': associated_tags
        }
        return response_message

    @staticmethod
    def add_tag(image_object: Image, tag_id: int) -> dict:
        """Creates ImageTag association from request received from client for new tag on image.

        Parameters
        ----------
        image_object: Image
            Image model instance to be updated.
        tag_id: int
            ID of tag to be added.

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
            {'type': 'tagAdded', 'id': new_imagetag.id, 'imageId': image_id, 'tagId': tag_id}
        """

        try:
            tag_object: Tag = Tag.objects.get(id=tag_id)  # Django requires Tag object for query
        except ObjectDoesNotExist:
            response_message = {'type': 'message', 'message': "Can't add a tag that doesn't exist!"}
            return response_message

        if ImageTag.objects.filter(image_id=image_object, tag_id=tag_object).exists():
            # if tag association already exists, inform the client and do not re-create it
            response_message = {'type': 'message', 'message': 'This tag association already exists!'}
            return response_message
        else:
            # if tag association does not exist, create it and inform client
            new_imagetag = ImageTag(image_id=image_object, tag_id=tag_object)
            new_imagetag.save()
            response_message: dict = {
                'type': 'tagAdded',
                'id': new_imagetag.id,
                'imageId': image_object.id,
                'tagId': tag_id
            }
            return response_message

    @staticmethod
    def remove_tag(image_object: Image, tag_id: int) -> dict:
        """Deletes ImageTag association from request received from client for new tag on image.

        Parameters
        ----------
        image_object: Image
            Image model instance to be updated.
        tag_id: int
            ID of tag to be removed.

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
            {'type': 'tagRemoved', 'id': imagetag_id, 'imageId': image_id}
        """

        try:
            tag_object: Tag = Tag.objects.get(id=tag_id)  # Django requires Tag object for query
            imagetag_object: ImageTag = ImageTag.objects.get(image_id=image_object, tag_id=tag_object)
            imagetag_id: int = imagetag_object.id
            imagetag_object.delete()

            response_message: dict = {
                'type': 'tagRemoved',
                'id': imagetag_id,
                'imageId': image_object.id
            }
            return response_message
        except Tag.DoesNotExist:
            response_message = {'type': 'message', 'message': "Can't remove a tag that doesn't exist!"}
            return response_message
        except ImageTag.DoesNotExist:
            response_message = {'type': 'message', 'message': 'Tag association does not exist!'}
            return response_message


    @staticmethod
    def create_tag(tag_label: str, tag_owner: AppUser) -> dict:
        new_tag: Tag = Tag(name=tag_label, owner=tag_owner)
        new_tag.save()
        response_message = {
            'type': 'tagCreated',
            'id': new_tag.id,
            'name': new_tag.name,
            'owner': tag_owner.id
        }
        return response_message

    def update_tags(self, text_data_json: dict) -> list:
        """Updates ImageTag associations for an image as requested by user.

        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For update_tags, expected structure is:
                {'type': 'updateTags',
                'imageId': (numerical imageId, represented as a str),
                'tagArray': (dict containing tags of this image)

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
        """

        responses_list: list = []  # Used to inform client of changes
        try:
            user_id: int = text_data_json['user']
            user: AppUser = AppUser.objects.get(id=user_id)
            image_id: str = text_data_json['imageId']
            image_object: Image = Image.objects.get(id=image_id)  # Django requires Image object for query
            imagetag_query: QuerySet = ImageTag.objects.filter(image_id=image_object)
            tag_array: list = text_data_json['tagArray']
        except AppUser.DoesNotExist:
            response_message: dict = {'type': 'message', 'message': 'Specified user does not exist!'}
            responses_list.append(response_message)
            return responses_list
        except Image.DoesNotExist:
            response_message: dict = {'type': 'message', 'message': 'Specified image does not exist!'}
            responses_list.append(response_message)
            return responses_list

        # create newly defined tags
        for tag in tag_array:
            # new tags will have a "newTag" prefix on their ID, ex. "newTag2"
            if re.match(r'newTag\d+', str(tag['id'])):
                tag_array.remove(tag)  # remove the temporary id
                new_tag_details = self.create_tag(tag['label'], user)
                tag_array.append(new_tag_details)  # add new permanent id
                responses_list.append(new_tag_details)  # to inform frontend

        existing_tag_ids: set = set(result.tag_id.id for result in imagetag_query)
        new_tag_ids: set = set(tag['id'] for tag in tag_array)

        add_tags: set = new_tag_ids.difference(existing_tag_ids)
        remove_tags: set = existing_tag_ids.difference(new_tag_ids)

        for tag_id in add_tags:
            tag_added_details: dict = self.add_tag(image_object, tag_id)
            responses_list.append(tag_added_details)
        for tag_id in remove_tags:
            tag_removed_details = self.remove_tag(image_object, tag_id)
            responses_list.append(tag_removed_details)
        return responses_list

    @staticmethod
    def delete_image(text_data_json: dict) -> dict:
        """Deletes image from persistent storage, and removes record from database.

        Future change: check for existence of both file and DB entry before performing action
        Future change: Move image to "Trash" folder rather than deleting immediately

        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For delete_image, expected structure is:
                {'type': 'deleteImage',
                'imageId': (numerical imageId, represented as a str)
                }

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
            {'type': 'imageDeleted', 'id': image_id}

        Raises
        ------
        FileNotFoundError
            If requested file is not found in persistent storage.
        """

        image_id: str = text_data_json['imageId']
        try:
            image_object: Image = Image.objects.get(id=image_id)
        except Image.DoesNotExist:
            response_message: dict = {
                'type': 'message',
                'message': 'Specified image does not exist!'
            }
            return response_message

        source_filename: str = image_object.source
        app_media_root: str = settings.MEDIA_ROOT
        full_file_path: str = \
            f'{app_media_root}/{source_filename}'

        try:
            os.remove(full_file_path)
            image_object.delete()
            response_message = {'type': 'imageDeleted', 'id': image_id}
            return response_message
        except FileNotFoundError:
            # TODO: add logging for this error
            response_message: dict = {
                'type': 'message',
                'message': f'File {source_filename} not found!'
            }
            return response_message

    @staticmethod
    def delete_images(text_data_json: dict) -> dict:
        
        image_ids = text_data_json['imageIds']
        deleted_ids: list = []
        record_not_found_ids: list = []
        source_not_found_ids: list = []

        for image_id in image_ids:
            try:
                image_object: Image = Image.objects.get(id=image_id)

                source_filename: str = image_object.source
                app_media_root: str = settings.MEDIA_ROOT
                full_file_path: str = \
                    f'{app_media_root}/{source_filename}'
                
                os.remove(full_file_path)
                image_object.delete()
                # make a note of deletion for response message
                deleted_ids.append(image_id)
            except Image.DoesNotExist:
                # make a note of this for the respone
                record_not_found_ids.append(image_id)
            except FileNotFoundError:
                # make a note of this for logging and response
                source_not_found_ids.append(image_id)

        if record_not_found_ids or source_not_found_ids:
            response_message: dict = {
                'type': 'deletionErrors',
                'successfulDeletions': deleted_ids,
                'recordNotFound': record_not_found_ids,
                'sourceNotFound': source_not_found_ids
            }
            return response_message
        
        response_message: dict = {'type': 'imagesDeleted', 'ids': deleted_ids}
        return response_message

    @staticmethod
    def update_description(text_data_json: dict) -> None:
        """Updates description on image (in database) as specified by client.

        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For update_description, expected structure is:
                {'type': 'updateDescription',
                'imageId': (numerical imageId, represented as a str),
                'description': (str)
                }

        Returns
        -------
        None
        """

        image_id: str = text_data_json['imageId']
        new_description: str = text_data_json['description']
        image_object: Image = Image.objects.get(id=image_id)
        image_object.description = new_description
        image_object.save()
        print(f"Description for image {image_id} updated to {new_description}")

    @staticmethod
    def update_tag_name(text_data_json: dict) -> dict:
        """Updates name of specified tag.
        
        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For update_tag_name, expected structure is:
            {'type': 'updateTagName', 
            'tagId': (numerical tagId, represented as a str),
            'name': (str)
            }

        Returns
        -------
        WebSocket message with the following structure:
            {'type': 'tagUpdated', 'id': tag_id, 'name': new_name}
          
        """
        
        tag_id: str = text_data_json['tagId']
        new_name: str = text_data_json['name']
        tag_object: Tag = Tag.objects.get(id=tag_id)
        tag_object.name = new_name
        tag_object.save()
        print(f"Name for tag {tag_id} updated to {new_name}")
        response_message = {
            'type': 'tagUpdated',
            'id': tag_id,
            'name': new_name,
            'owner': tag_object.owner.id
        }
        return response_message

    def send_response(self, response_message: dict) -> None:
        self.send(text_data=json.dumps(response_message))

    def receive(self, text_data: str = None, bytes_data: bytes = None) -> None:
        """Routes incoming messages by type to the proper method for handling.

        Parameters
        ----------
        text_data: str
            WebSocket message, in string format.  Preferred option.
        bytes_data: bytes
            Websocket message, in bytes format.
            Not currently used by any methods on this consumer.

        Returns
        -------
        None
        """

        text_data_json: dict = json.loads(text_data)
        message_type: str = text_data_json.get('type')

        match message_type:
            case 'message':
                websocket_message: str = text_data_json['message']
                print(f'Websocket Message: {websocket_message}')
            case 'filterChange':
                self.send_response(text_data_json)
            case 'activeFilters':
                response_message = self.apply_filters(text_data_json)
                self.send_response(response_message)
            case 'updateTags':
                responses_list: list = self.update_tags(text_data_json)
                for response_message in responses_list:
                    self.send_response(response_message)
            case 'deleteImage':
                response_message = self.delete_image(text_data_json)
                self.send_response(response_message)
            case 'deleteImages':
                response_message = self.delete_images(text_data_json)
                self.send_response(response_message)
            case 'updateDescription':
                self.update_description(text_data_json)  # no response needed
            case 'updateTagName':
                response_message = self.update_tag_name(text_data_json)
                self.send_response(response_message)
            case _:
                print("Unexpected websocket message type!")
                print(text_data_json)
