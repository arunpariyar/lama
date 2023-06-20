"use strict";

const express = require("express");
const cors = require("cors");

require("dotenv").config();

const router = require("./router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CORSCONFIG = {
  origin: "http://localhost:3000",
  credentials: true,
};

require("./services/service.dispatcher.js");

app.use(cors(CORSCONFIG));
app.use(router);

module.exports = app;
