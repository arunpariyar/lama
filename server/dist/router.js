"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController = __importStar(require("./controllers/controller.user"));
// const catController = require("./controllers/controller.cat");
// const itemController = require("./controllers/controller.item");
// const emailController = require("./controllers/controller.email");
// const aiController = require("./controllers/controller.ai");
router.get("/user/:id", userController.getUserById);
router.post("/register", userController.registerUser);
router.post("/login", userController.logIn);
router.put("/user", userController.updateUser);
// router.get("/category/:id", catController.getCatById);
// router.post("/category", catController.createCat);
// router.delete("/category", catController.deleteCat);
// router.put("/category", catController.updateCat);
// router.get("/item/:id", itemController.getItemById);
// router.post("/item", itemController.createItem);
// router.delete("/item", itemController.deleteItem);
// router.put("/item", itemController.updateItem);
// router.get("/email/:userid", emailController.sendEmail);
// router.post("/chat", aiController.sendMessage);
exports.default = router;
