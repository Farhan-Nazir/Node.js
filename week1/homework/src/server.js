"use strict";

const http = require("http");
const axios = require("axios");
const sendState = require("./responses/sendState");

/* `createServer` MUST return an instance of `http.Server` otherwise the tests
 * will fail.
 */
function createServer(port) {
  let state = 10;

  const server = http.createServer((request, response) => {
    // TODO: Write your homework code here
    // if (request.url === "/state") {
    //   response.writeHead("200", { "content-type": "application/json" });
    //   response.write(JSON.stringify(sendState(state)));
    //   response.end();
    // }
    switch (request.url) {
      case "/state":
        response.writeHead("200", { "content-type": "application/json" });
        response.write(JSON.stringify(sendState(state)));
        response.end();
        break;
      case "/add":
        response.writeHead("200", { "content-type": "application/json" });
        response.write(JSON.stringify(sendState(state + 1)));
        response.end();
        break;

      case "/subtract":
        response.writeHead("200", { "content-type": "application/json" });
        response.write(JSON.stringify(sendState(state - 1)));
        response.end();
        break;
      case ("/add", "/state"):
        response.writeHead("200", { "content-type": "application/json" });
        response.write(JSON.stringify(sendState(state + 2)));
        response.end();
        break;
      case "/reset":
        response.writeHead("200", { "content-type": "application/json" });
        response.write(JSON.stringify(sendState(state)));
        response.end();
        break;

      default:
        break;
    }
  });

  return server;
}

module.exports = {
  createServer
};
