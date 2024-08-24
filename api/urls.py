"""Registers package URLs to the Django app.

The following URLs provide API-delivered data
for initial page load:
 - user/
 - image/
 - tag/
 - image-tag/

The 'upload/' path provides a target for upload
files to be added to persistent storage and
recorded to the database.  See api.uploads for
more information.
"""

from django.urls import path
from .views import AppUserView, ImageView, TagView, ImageTagView, upload

app_name = 'api'
urlpatterns = [
    path('user/', AppUserView.as_view()),
    path('image/', ImageView.as_view()),
    path('tag/', TagView.as_view()),
    path('image-tag/', ImageTagView.as_view()),
    path('upload/', upload, name="upload")
]
