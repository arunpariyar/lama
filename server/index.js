"use strict";
//require the koa package
// const Koa = require("koa");
const express = require("express");

//require the cors package
// const cors = require("@koa/cors");
const cors = require("cors");

//require the bodyparser
// const bodyParser = require("koa-bodyparser");

//require the dotenv
require("dotenv").config();

//require the routers
const router = require("./router.js");

//create an instace of express app
// const app = new Koa();
const app = express();

//require the bodyparser
// const bodyParser = require("koa-bodyparser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 3100;
const CORSCONFIG = {
  origin: "http://localhost:3000",
  credentials: true,
};

require("./services/service.dispatcher.js");

//
app.use(cors(CORSCONFIG));
// app.use(bodyParser());

// app.use(router.routes());
app.use(router);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
