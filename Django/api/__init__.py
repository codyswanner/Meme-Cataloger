"""The api package is responsible for exposing DB data to the frontend,
and allowing new data from frontend to be saved to the DB.

Modules
-------
admin.py
    Registers models to the Django admin panel.
    Not currently in use.

apps.py
    Registers the package as an app to be called by the Django app.

models.py
    Defines DB models for application data.
    Includes the Image, Tag and ImageTag classes, which underpin
    the data structure for the entire application.

serializers.py
    Allows serialization of DB data for API delivery to frontend.

tests.py
    Tests for the package.  (Not yet in use.)

uploads.py
    Handles data uploads; specifically, new file uploads.

urls.py
    Registers package URLs to the Django app.

views.py
    Defines views for the app, which are informational, or "uploads."
    Informational views give a clear look at data such as Users,
    Images, Tags, and ImageTags.
    The "uploads" view provides a target for uploaded files to be
    loaded and saved into the Django server.
"""
