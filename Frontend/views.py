from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.

# CSRF Cookie is required for image upload form.
# For details, see https://docs.djangoproject.com/en/5.0/howto/csrf/
@ensure_csrf_cookie
def index(request):
    return render(request, 'Frontend/index.html')
