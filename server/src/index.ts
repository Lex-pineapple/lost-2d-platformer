// import path from 'path';
import express from 'express';
import http from 'http';

import moduleA from './module-a';
import moduleB from './module-b';

const port = 7878;
const url = 'localhost';
// const staticUrl = '/';
// const staticDir = path.join(__dirname, 'dist');

const app = express();
const server = http.createServer(app);

// Start server
server.on('listening', () => console.log(`Server listening to ${url}:${port}`));
server.on('error', (err) => console.error(err));
server.listen(port, url);

// Config server
app.use(express.json());

// app.use(staticUrl, express.static(staticDir));

const print = (s: string) => {
  console.log(s);
};

app.get('/', (req, res, next) => {
  const a = moduleA();
  print(a);

  const b = moduleB();
  print(b);

  next();
});
