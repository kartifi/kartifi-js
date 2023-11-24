FROM debian:bookworm-slim

FROM mcr.microsoft.com/playwright:v1.40.0-jammy

RUN npm install -g yarn \
    && yarn global add pm2 typescript nodemon

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn workspaces run build