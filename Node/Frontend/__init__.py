"""The Frontend package contains data for the client to render,
as well as development scripts that watch for changes (webpack)
and Django files that integrate the Frontend into the Django server.

Modules
-------
apps.py
    Registers the package as an app to be called by the Django app.

tests.py
    Tests for the package.  (Not yet in use.)

urls.py
    Registers package URLs to the Django app.

views.py
    Defines the view for this app, which delivers data to client.

Directories
-----------
node_modules
    Contains dependencies for ReactJS files, found in src.

src
    Contains ReactJS files that define the frontend.

static
    Contains static files for the frontend, including:
        favicon for the site
        main.js -- the script used by the browser to render the site
        main.js.LICENSE.txt -- license for main.js

templates
    Contains the Django template for the frontend.
    This is the rendering bridge between Django and ReactJS frontend.
"""
