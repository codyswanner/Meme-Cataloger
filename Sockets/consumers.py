import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


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

    def receive(self, text_data=None, bytes_data=None):
        # what to do when the user clicks a filter checkbox.
        # see documentation and tutorial code,
        # and just be smart and figure it out.

        # Query database for images matching filters?
        # Will that be somewhere else?
        # Does that get handed to the API somehow?

        # Is this where a message is sent to Django/React
        # to update the list of pictures?
        pass
