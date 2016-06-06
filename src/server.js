'use strict';

console.log(`Starting server at ${(new Date()).toISOString()}`);
process.on('exit', () => {
  console.log(`Process exit at ${(new Date()).toISOString()}`);
});

const spdy = require('spdy');
const web = require('./koa');

const getServer = () => {
  const server = spdy.createServer({
    spdy: {
      plain: true,
      ssl: false
    }
  }, web.callback());

  return server;
};

getServer().listen(3000, () => {
  console.log('HTTP server listening on port 3000');
});
