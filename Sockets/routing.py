from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/connection/path/here', consumers.FilterConsumer.as_asgi()),
]