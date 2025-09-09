// const http = require("http");
import http, { request } from "http";

let books = [
  {
    id: 1,
    name: "HTML CSS",
    price: 98,
  },
  {
    id: 2,
    name: "JS",
    price: 200,
  },
];

const reqHandler = (request, response) => {
  response.statusCode = 200;

  let resObj = JSON.stringify(books);
  if (request.url.includes("books")) {
    response.end(resObj);
  } else {
    response.end("Welcome to NodeJS!");
  }
};

const server = http.createServer(reqHandler);

server.listen(5000);

/// REST API | SOAP

// REST API - Request Methods / Action Verbs
// GET - Fetch Data
// POST - Creating Data / Sending Data
// PUT & PATCH - Updating
// DELETE - Deleting a Data
