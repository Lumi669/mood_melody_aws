const express = require("express");
const serverless = require("serverless-http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

const server = express();

app
  .prepare()
  .then(() => {
    server.all("*", (req, res) => {
      console.log("req.url from server.js === ", req.url);
      console.log(`Handling request for ${req.url}`);
      return handle(req, res);
    });

    module.exports.handler = serverless(server);
  })
  .catch((err) => {
    console.error("Error during app preparation:", err);
    process.exit(1); // Exit the process if there's an error
  });
