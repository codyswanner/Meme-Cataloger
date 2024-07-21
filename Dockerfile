# Pull the base image
ARG PYTHON_VERSION=3.12.2
FROM python:${PYTHON_VERSION} AS base

# Install OS-level dependencies
RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y sudo default-libmysqlclient-dev pkg-config \
	&& rm -rf /var/lib/apt/lists/*

# Prevents issues with pyc files and crash logs.
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Create a non-privileged user to run the app
ARG UID=10001
RUN useradd -m --uid "${UID}" django-server

# Copy source code into the container
COPY . /home/django-server/

# Download python dependencies
RUN --mount=type=cache,target=/root/.cache/pip \
	--mount=type=bind,source=requirements.txt,target=requirements.txt \
	pip install --root-user-action=ignore --upgrade pip \
	&& pip install --root-user-action=ignore mysqlclient \
	&& pip install --root-user-action=ignore -r requirements.txt

WORKDIR /home/django-server/
USER django-server

# Expose the port that the application listens on
EXPOSE 8000

# Make migrations to the database
RUN python manage.py makemigrations

# Run the application
CMD ["bash", "-c", "python manage.py migrate & python manage.py runserver 0.0.0.0:8000"]
