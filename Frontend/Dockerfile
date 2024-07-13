FROM node

RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y sudo gcc pkg-config

# Create a non-privileged user to run processes
ARG UID=10001
RUN useradd -m --uid "${UID}" front-runner
RUN --mount=type=secret,id=node-sudo-pw echo "front-runner:$(cat /run/secrets/node-sudo-pw)" | chpasswd
RUN usermod -aG sudo front-runner

# Create a sudoers configuration file in /etc/sudoers.d/
RUN echo 'front-runner localhost=(root) NOPASSWD: /usr/local/bin/npm' > /etc/sudoers.d/front-runner \
	&& chmod 440 /etc/sudoers.d/front-runner \
	&& chown root:root /etc/sudoers.d/front-runner

COPY . /home/front-runner/

WORKDIR /home/front-runner/Frontend
RUN sudo /usr/local/bin/npm install

VOLUME /home/front-runner/src

CMD ["bash", "-c", "npm run dev"]
