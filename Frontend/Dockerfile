FROM node:lts-slim

RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y sudo gcc pkg-config

# Create a non-privileged user to run processes
ARG UID=10001
RUN useradd -m --uid "${UID}" front-runner
RUN usermod -aG sudo front-runner

# Create a sudoers configuration file in /etc/sudoers.d/
RUN echo 'front-runner localhost=(root) NOPASSWD: /usr/local/bin/npm' > /etc/sudoers.d/front-runner \
	&& chmod 440 /etc/sudoers.d/front-runner \
	&& chown root:root /etc/sudoers.d/front-runner

COPY . /home/front-runner/

WORKDIR /home/front-runner/

RUN npm install

# USER front-runner
CMD ["bash", "-c", "npm run dev"]
