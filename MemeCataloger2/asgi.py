"""
ASGI config for MemeCataloger2 project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application

from Sockets.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MemeCataloger2.settings')

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": django_asgi_app,  # Route HTTP Requests to standard Django app
        "websocket":  # Route websocket requests to Channels consumer
            # Validate Hosts for request - https://channels.readthedocs.io/en/latest/topics/security.html
            AllowedHostsOriginValidator(
                # Validate User/Session - https://channels.readthedocs.io/en/latest/topics/authentication.html
                AuthMiddlewareStack(  # Future: user/session authentication
                    URLRouter(  # Route websocket requests to Sockets package
                        websocket_urlpatterns  # send to Sockets.routing
                    )
                )
            ),
    }
)
