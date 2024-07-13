"""routing.py
Routes requests for processing by consumers.FilterConsumer.
https://channels.readthedocs.io/en/latest/topics/routing.html
"""

from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/filter-socket', consumers.FilterConsumer.as_asgi()),
]
