# Always build against latest stable
FROM node:latest-slim


# Install tool dependencies for app and git/ssh for the workspace
RUN apt-get update && apt-get install -y --no-install-recommends \
  ripgrep fd-find git ssh curl  \
  protobuf-compiler \
  libprotobuf-dev \
  pkg-config libssl-dev iputils-ping \
  && rm -rf /var/lib/apt/lists/* \
  && cp /usr/bin/fdfind /usr/bin/fd

RUN npm install -g yarn

COPY package.json yarn.lock /app/

run yarn install

RUN cargo install cargo-tarpaulin

COPY . /app

WORKDIR /app
