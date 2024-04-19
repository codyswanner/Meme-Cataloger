"""WebSocket Consumers to handle messages between client and backend.

Includes FilterConsumer class, the methods of which handle WebSocket
messages from the frontend, including any processing, database calls,
and responses back to client.
"""

import os
import json
from asgiref.sync import async_to_sync
from django.db.models.query import QuerySet
from channels.generic.websocket import WebsocketConsumer

from api.models import *


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
        (In the future, this method may also handle user/session identification.)
        """

        self.user_id = 1  # Feature not yet implemented; only user is test_user, id=1
        self.layer_name = f"{self.user_id}_gallery"

        # Join channel layer
        async_to_sync(self.channel_layer.group_add)(
            self.layer_name, self.channel_name
        )

        self.accept()

    def disconnect(self, code: int) -> None:
        """Cleans up connection; no current functionality.
        In the future this method will clean up any sessions or other
        leftover structures that were created by the connect method.
        """

        # Leave channel layer?
        pass

    def filter_change(self, text_data_json: dict) -> None:
        """On filter change request from client, triggers filter change activity.
        Future change: this method seems redundant/roundabout.  Can it be removed?

        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For filter_change, expected structure is:
                {'type':'filterChange',
                'filterName': (str),
                'filterId': (numerical id represented as a str),
                'filterState': ("on" | "off")
                }

        Returns
        -------
        None; however, forwards received WebSocket message back to client.
        """

        filter_name: str = text_data_json['filterName']
        filter_id: str = text_data_json['filterId']
        filter_state: str = text_data_json['filterState']

        if filter_state == "on":
            print(f'Filter selected: {filter_name} with id {filter_id}')
        else:
            print(f'Filter deselected: {filter_name} with id {filter_id}')

        self.send(text_data=json.dumps(text_data_json))

    def apply_filters(self, text_data_json: dict) -> None:
        """Queries DB for objects matching filter array, and passes this list back to the client.

        Parameters
        ----------
         text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For apply_filters, expected structure is:
                {'type': 'activeFilters',
                'activeFilters': (numerical filter ids represented as a list of strings)
                }

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
            {'type': 'applyFilters', 'results': image_results}
        """

        print("\n\nNew Filter Array!")
        print(text_data_json)
        active_filters: list = text_data_json['activeFilters']
        image_queryset: QuerySet = Image.objects.all()
        image_results: list = []
        for f in active_filters:
            image_queryset = image_queryset.filter(imagetag__tag_id=f)
        for result in image_queryset:
            image_results.append(result.id)
        print(image_results)

        self.send(text_data=json.dumps({'type': 'applyFilters', 'results': image_results}))

    def add_tag(self, text_data_json: dict) -> None:
        """Creates ImageTag association from request received from client for new tag on image.

        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For add_tag, expected structure is:
                {'type': 'addTag',
                'imageId': (numerical imageId, represented as a str),
                'tagId': (numerical tagId, represented as a str)
                }

        Returns
        -------
        None; however, sends a WebSocket message to client with the following structure:
            {'type': 'tagAdded', 'id': new_imagetag.id, 'imageId': image_id, 'tagId': tag_id}
        """

        image_id: str = text_data_json['imageId']
        image_object: Image = Image.objects.get(id=image_id)  # Django requires Image object for query
        tag_id: str = text_data_json['tagId']
        tag_object: Tag = Tag.objects.get(id=tag_id)  # Django requires Tag object for query

        if ImageTag.objects.filter(image_id=image_object, tag_id=tag_object).exists():
            # if tag association already exists, inform the client and do not re-create it
            return_message = {'type': 'message', 'message': 'This tag association already exists!'}
            self.send(text_data=json.dumps(return_message))
        else:
            # if tag association does not exist, create it and inform client
            new_imagetag = ImageTag(image_id=image_object, tag_id=tag_object)
            new_imagetag.save()
            return_message: dict = {
                'type': 'tagAdded',
                'id': new_imagetag.id,
                'imageId': image_id,
                'tagId': tag_id
            }
            self.send(text_data=json.dumps(return_message))

    def remove_tag(self, text_data_json: dict) -> None:
        """Deletes ImageTag association of tag on image specified by client.

        Parameters
        ----------
        text_data_json: dict
            Websocket JSON message, translated to a Python dict by receive method.
            For remove_tag, expected structure is:
                {'type': 'removeTag',
                'imageId': (numerical imageId, represented as a str),
                'imageTagId': (numerical imageTagId, represented as a str),
                'tagId': (numerical TagId, represented as a str)
                }

        Returns
        -------
         None; however, sends a WebSocket message to client with the following structure:
            {'type': 'tagRemoved', 'id': imagetag_id, 'imageId': image_id}
        """
        image_id: str = text_data_json['imageId']
        imagetag_id: str = text_data_json['imageTagId']

        # TODO: Check first if ImageTag exists?
        imagetag_object: ImageTag = ImageTag.objects.get(id=imagetag_id)
        imagetag_object.delete()

        return_message: dict = {'type': 'tagRemoved', 'id': imagetag_id, 'imageId': image_id}
        self.send(text_data=json.dumps(return_message))

    def delete_image(self, text_data_json: dict) -> None:
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
        print(f"Delete request received for image %s" % image_id)

        image_object: Image = Image.objects.get(id=image_id)
        source_filename: str = image_object.source
        print(f"Image filename is %s" % source_filename)
        full_file_path: str = \
            f'C:\\Users\\codys\\Dev\\PycharmProjects\\Django' \
            f'\\MemeCataloger2\\media\\%s' % source_filename

        # TODO: check for existence of both file and DB entry before performing action
        try:
            os.remove(full_file_path)
            print("File deleted from disk")
            image_object.delete()
            print("Image object deleted from database")
            print("Delete image completed!")
            return_message = {'type': 'imageDeleted', 'id': image_id}
            self.send(text_data=json.dumps(return_message))
        except FileNotFoundError:
            print("File not found!")

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
        print(f"Description for image %s update to %s" % (image_id, new_description))

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
                self.filter_change(text_data_json)
            case 'activeFilters':
                self.apply_filters(text_data_json)
            case 'addTag':
                self.add_tag(text_data_json)
            case 'removeTag':
                self.remove_tag(text_data_json)
            case 'deleteImage':
                self.delete_image(text_data_json)
            case 'updateDescription':
                self.update_description(text_data_json)
            case _:
                print("Unexpected websocket message type!")

