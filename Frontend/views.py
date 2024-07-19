"""Defines the view for this app, which delivers data to client.

Functions
---------
index(request: HttpRequest) -> HttpResponse
    Initial gateway for the client to access page data.
"""

from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
# Imports below are for TypeHints
from django.http import HttpRequest, HttpResponse


# Create your views here.

# CSRF Cookie is required for image upload form.
# For details, see https://docs.djangoproject.com/en/5.0/howto/csrf/
@ensure_csrf_cookie
def index(request: HttpRequest) -> HttpResponse:
    return render(request, 'frontend/index.html')

def imageView(request: HttpRequest) -> HttpResponse:
    return render(request, 'frontend/image_view.html')
