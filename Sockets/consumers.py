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

        # Expire any sessions/tokens?
        # Close any database connections?
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
        image_results = Image.objects.all()
        for f in active_filters:
            image_results = image_results.filter(imagetag__tag_id=f)
        for result in image_results:
            print(result.id)

        self.send(text_data=json.dumps("Finish apply_filters function!"))

    def receive(self, text_data=None, bytes_data=None):
        # what to do when the user clicks a filter checkbox.
        # see documentation and tutorial code,
        # and just be smart and figure it out.

        # Query database for images matching filters?
        # Will that be somewhere else?
        # Does that get handed to the API somehow?

        # Is this where a message is sent to Django/React
        # to update the list of pictures?
        text_data_json = json.loads(text_data)
        message_type = text_data_json.get('type', None)

        if message_type == 'message':
            websocket_message = text_data_json['message']
            print(f'Websocket Message: {websocket_message}')
        elif message_type == 'filterChange':
            self.filter_change(text_data_json)
            print(text_data_json)
        elif message_type == 'activeFilters':
            self.apply_filters(text_data_json)
        else:
            print("Unexpected websocket message type!")
