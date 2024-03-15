from django.urls import path
from .views import *

app_name = 'api'
urlpatterns = [
    path('user/', UserView.as_view()),
    path('image/', ImageView.as_view()),
    path('tag/', TagView.as_view()),
    path('image-tag/', ImageTagView.as_view()),
    path('upload/', upload, name="upload")
]

