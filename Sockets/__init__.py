"""Sockets

Holds routing and the Channels consumer for WebSocket requests.

Modules
-------
consumers.py
    WebSocket Consumers to handle messages between client and backend.
    Uses Channels package for WebSocket consumers.
    https://channels.readthedocs.io/

routing.py
    Routes requests for processing by consumers.FilterConsumer.
    https://channels.readthedocs.io/en/latest/topics/routing.html
"""
