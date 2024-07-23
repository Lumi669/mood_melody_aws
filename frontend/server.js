// server.js
const express = require("express");
const serverless = require("serverless-http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();

const server = express();

app.prepare().then(() => {
  server.get("/prod/live", (req, res) => {
    res.json({ message: "Live page" });
  });

  server.get("/prod/allmusic", (req, res) => {
    res.json({ message: "Live page" });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  module.exports.handler = serverless(server);
});
