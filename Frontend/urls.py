from django.urls import path
from . import views

app_name = 'Frontend'
urlpatterns = [
    path('', views.index, name="index"),
]
