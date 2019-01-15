'use strict';

const http = require('http');
const result = require('./helper/helper');

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here

    switch (request.url) {
      case '/state':
        result(response, state);
        break;
      case '/add':
        state++;
        result(response, state);
        break;
      case '/subtract':
        state--;
        result(response, state);
        break;
      case '/reset':
        state = 10;
        result(response, state);
        break;
      default:
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: 'Not found' }));
    }
  });

  return server;
}

module.exports = {
  createServer
};
