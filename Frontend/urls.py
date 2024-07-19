"""Registers package URLs to the Django app.
Frontend has only an "index" url,
for providing data for initial page load.
"""

from django.urls import path
from . import views

app_name: str = 'Frontend'
urlpatterns: list = [
    path('', views.index, name="index"),
    path('image/test', views.imageView, name="imageView")
]
