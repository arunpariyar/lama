"use strict";

const express = require("express");
const cors = require("cors");

require("dotenv").config();

const router = require("./router.js");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.SERVER_PORT || 3100;
const CORSCONFIG = {
  origin: "http://localhost:3000",
  credentials: true,
};

require("./services/service.dispatcher.js");

app.use(cors(CORSCONFIG));
app.use(router);

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
