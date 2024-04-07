import os
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from api.models import *


class FilterConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user_id = None
        self.layer_name = None

    def connect(self):
        # what to do on connection opened.
        # see documentation and tutorial code.

        # Some ideas:
        # Authenticate user, match client with backend,
        # create some kind of session/token to keep things in order
        self.user_id = 1
        self.layer_name = f"{self.user_id}_gallery"

        # Join channel layer
        async_to_sync(self.channel_layer.group_add)(
            self.layer_name, self.channel_name
        )

        self.accept()

    def disconnect(self, code):
        # what to do on connection close.
        # see documentation and tutorial code,
        # make sure to clean up any messes you left.

        # Leave channel layer?
        pass

    def filter_change(self, text_data_json):
        filter_name = text_data_json['filterName']
        filter_id = text_data_json['filterId']
        filter_state = text_data_json['filterState']

        if filter_state == "on":
            print(f'Filter selected: {filter_name} with id {filter_id}')
        else:
            print(f'Filter deselected: {filter_name} with id {filter_id}')

        self.send(text_data=json.dumps(text_data_json))

    def apply_filters(self, text_data_json):
        print("\n\nNew Filter Array!")
        print(text_data_json)
        active_filters = text_data_json['activeFilters']
        image_queryset = Image.objects.all()
        image_results = []
        for f in active_filters:
            image_queryset = image_queryset.filter(imagetag__tag_id=f)
        for result in image_queryset:
            image_results.append(result.id)
        print(image_results)

        self.send(text_data=json.dumps({'type': 'applyFilters', 'results': image_results}))

    def add_tag(self, text_data_json):
        image_id = text_data_json['imageId']
        tag_id = text_data_json['tagId']

        image_object = Image.objects.get(id=image_id)
        tag_object = Tag.objects.get(id=tag_id)
        t = ImageTag(image_id=image_object, tag_id=tag_object)
        t.save()

        # send an update to client
        return_message = {'type': 'tagAdded', 'id': t.id, 'imageId': image_id, 'tagId': tag_id}
        self.send(text_data=json.dumps(return_message))

    def remove_tag(self, text_data_json):
        image_id = text_data_json['imageId']
        tag_id = text_data_json['tagId']

        image_object = Image.objects.get(id=image_id)
        tag_object = Tag.objects.get(id=tag_id)
        image_tag_object = ImageTag.objects.get(image_id=image_object, tag_id=tag_object)
        image_tag_object_id = image_tag_object.id
        image_tag_object.delete()

        # send an update to the client
        return_message = {'type': 'tagRemoved', 'id': image_tag_object_id, 'imageId': image_id, 'tagId': tag_id}
        self.send(text_data=json.dumps(return_message))

    def delete_image(self, text_data_json):
        image_id = text_data_json['imageId']
        print(f"Delete request received for image %s" % image_id)

        image_object = Image.objects.get(id=image_id)
        source_filename = image_object.source
        print(f"Image filename is %s" % source_filename)
        full_file_path = \
            f'C:\\Users\\codys\\Dev\\PycharmProjects\\Django' \
            f'\\MemeCataloger2\\media\\%s' % source_filename
        print(full_file_path)

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
    def update_description(text_data_json):
        image_id = text_data_json['imageId']
        new_description = text_data_json['description']
        image_object = Image.objects.get(id=image_id)
        image_object.description = new_description
        image_object.save()
        print(f"Description for image %d update to %s" % (image_id, new_description))

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type')

        match message_type:
            case 'message':
                websocket_message = text_data_json['message']
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
