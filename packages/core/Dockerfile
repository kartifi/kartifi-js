FROM debian:bookworm-slim
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 20.7.0


RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* \
    && curl -sL curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash \
    && . /root/.bashrc \
    && nvm install $NODE_VERSION \
    && npm install -g typescript nodemon