# Node/Typescript FTP Server Over Docker

[![CI](https://github.com/chepetime/ts-ftp-server-docker/actions/workflows/ci.yml/badge.svg)](https://github.com/chepetime/ts-ftp-server-docker/actions/workflows/ci.yml)

Simple ftp server using node and docker

## Prerequisites

- Node 20 LTS
- pnpm
- Docker

## Instructions

Install dependencies

```sh
pnpm install
```

Start the local environment with nodemon and ts-node

```sh
pnpm run dev
```

You can also start the Local environment with Docker

```sh
pnpm run docker:up
```

## Deployment (Heroku)
