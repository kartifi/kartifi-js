FROM debian:bookworm-slim

FROM mcr.microsoft.com/playwright:v1.40.0-jammy

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 20.7.0


RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/* \
    && curl -sL curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash \
    && . /root/.bashrc \
    && nvm install $NODE_VERSION \
    && npm install -g yarn \
    && yarn global add pm2 typescript

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn workspaces run build