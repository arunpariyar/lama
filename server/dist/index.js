"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
require("dotenv").config();
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.SERVER_PORT || 3100;
const CORSCONFIG = {
    origin: "http://localhost:3000",
    credentials: true,
};
// require("./services/service.dispatcher.js");
app.use(cors(CORSCONFIG));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log("Server running on port New", PORT);
});
