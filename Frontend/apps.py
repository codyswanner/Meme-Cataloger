"""Registers the package as an app to be called by the Django app.
"""

from django.apps import AppConfig


class FrontendConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Frontend'
