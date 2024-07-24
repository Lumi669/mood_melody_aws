// const express = require("express");
// const serverless = require("serverless-http");
// const next = require("next");
// const fs = require("fs");
// const path = require("path");

// const app = next({ dev: false });
// const handle = app.getRequestHandler();

// const server = express();

// // Endpoint to serve logs
// server.get("/logs", (req, res) => {
//   const logFile = "/tmp/server.log";
//   fs.readFile(logFile, "utf8", (err, data) => {
//     if (err) {
//       return res.status(500).send(`Error reading log file: ${err}`);
//     }
//     res.send(`<pre>${data}</pre>`);
//   });
// });

// app
//   .prepare()
//   .then(() => {
//     server.all("*", (req, res) => {
//       console.log("req.url from server.js === ", req.url);
//       console.log(`Handling request for ${req.url}`);
//       return handle(req, res);
//     });

//     module.exports.handler = serverless(server);
//   })
//   .catch((err) => {
//     console.error("Error during app preparation:", err);
//     process.exit(1); // Exit the process if there's an error
//   });

// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// console.log("Starting app preparation...");
// app
//   .prepare()
//   .then(() => {
//     console.log("App prepared, creating server...");
//     createServer((req, res) => {
//       const parsedUrl = parse(req.url, true);
//       handle(req, res, parsedUrl);
//     }).listen(3000, (err) => {
//       if (err) {
//         console.error("Error starting server:", err);
//         process.exit(1);
//       }
//       console.log("> Ready on http://localhost:3000");
//     });
//   })
//   .catch((err) => {
//     console.error("Error preparing app:", err);
//     process.exit(1);
//   });

const awsServerlessExpress = require("aws-serverless-express");
const express = require("express");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

console.log("Preparing Next.js application...");
app.prepare().then(() => {
  console.log("Next.js application prepared.");

  const server = express();

  server.get("*", (req, res) => {
    console.log("Handling request:", req.url);
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  if (dev) {
    console.log("Starting server in development mode...");
    server.listen(3000, (err) => {
      if (err) {
        console.error("Error starting server:", err);
        process.exit(1);
      }
      console.log("> Ready on http://localhost:3000");
    });
  } else {
    console.log("Starting server in Lambda environment...");
    const lambdaServer = awsServerlessExpress.createServer(server);

    exports.handler = (event, context) => {
      console.log("Received event:", JSON.stringify(event, null, 2));
      awsServerlessExpress.proxy(lambdaServer, event, context);
    };
  }
});
