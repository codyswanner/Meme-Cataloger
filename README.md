## Meme Cataloger

This is a project I am working on by myself with the goals of (1) creating something I want to use and (2) challening myself/learning more about programming.  I am using [ReactJS](https://react.dev/) as the frontend and Python [Django](docs.djangoproject.com) as the backend.

In terms of usability, the eventual goal of this project is for it to replace Google Photos as my place to store silly/funny internet media that I've saved, and for this project to have a better system for organizing and quickly finding my saved media.

In terms of programming experience, I would love for this project to be a showcase of what I can do in React and Python for potential employment opportunities, but the more realistic goal for me right now is simply to encounter real-world problems to spark reserach and learning.

### Tools, Packages, and Frameworks I am using
 1. [ReactJS](https://react.dev/) which has been the best intro to JavaScript that I could ask for, in that it's JavaScript that makes sense to a Python native.  (Currently the roots of this project are in Create React App, but I'm leaning CRA is not maintained any longer and looking at alternatives.  Perhaps Vite?  Suggestions welcome!)
 2. [Django](docs.djangoproject.com) for the backend, which has my favorite docs of all time (Material UI could learn a thing or two).  I am continually impressed by this framework, and it has had an outsized impact on the way I understand programming.
 3. [Channels for Django](https://channels.readthedocs.io/en/latest/) (for Websockets) which has been immensely helpful for getting instant updates to a page, much more quickly and simply than standard HTTP requests.  There is a single aspect of the site still running on classic HTTP (the image uploader) and I'm considering switching to Websockets for this as well.  If you have tips/advice on Websocket security, I'd love to learn anything I can about it!  I am also considering creating an HTTP fork of this project to learn how to manage a more traditional HTTP API a little better.
 4. [Material UI](https://mui.com/material-ui/getting-started/) which has been crucial for quickly implementing components that look better than I deserve to look.
 5. [Conventional Commits](conventionalcommits.org) which I have not yet needed to call upon for organizational/archival purposes, but has helped me to better structure my commits and commit messages, and even planning my work!
 6. [react-virtuoso](https://virtuoso.dev/) is running virtualization so that I can upload literally thousands of photos into this app and still have the front page load in milliseconds rather than minutes.

If you have any suggestions, questions, ideas, or just want to say hi, feel free to raise an issue on this repo and we can connect from there!
