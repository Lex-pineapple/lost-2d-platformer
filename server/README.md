## Lost 2D Platformer Game Server

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Built with <a href="http://nestjs.com" target="_blank">NestJS</a> – a progressive Node.js framework for building efficient and scalable server-side applications.</p>

## Setup and Running

- Use `node 18.x`
- Clone this repo: `$ git clone https://github.com/Lex-pineapple/lost-2d-platformer.git`
- Go to server directory: `$ cd server`
- Install dependencies: `$ npm i`
- Start server: `$ npm run start:dev`
- Send requests to: `http://127.0.0.1:7878` or to deploy `https://lost-2d-platformer-server.onrender.com`
- Complete Swagger API documentation at: `http://127.0.0.1:7878/api/docs` or in deploy: `https://lost-2d-platformer-server.onrender.com/api/docs`

## Installation

```bash
$ npm install
```

Keep in mind that you need to create `.env`, `.production.env`, `.development.env` file with your settings in the root of the `server` app.

You also need to create a local PostgreSQL database or connect to a remote one.

`.env`

```
PORT=...
POSTGRES_HOST=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
POSTGRES_PORT=...
```

`.development.env`

```
PORT=...
POSTGRES_HOST=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
POSTGRES_PORT=...
JWT_SECRET=...
```

`.production.env`

```
PORT=...
POSTGRES_HOST=...
POSTGRES_USER=...
POSTGRES_PASSWORD=...
POSTGRES_DB=...
POSTGRES_PORT=...
JWT_SECRET=...
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
