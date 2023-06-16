"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.logIn = exports.registerUser = exports.getUserById = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models/models");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield models_1.User.findById(userId).select({ password: 0 });
        res.send(user);
        res.status(200);
    }
    catch (error) {
        res.status(500);
        res.send(error);
    }
});
exports.getUserById = getUserById;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { "name", "email", "password" }
        const { name, email, password } = req.body;
        const hash = yield bcrypt_1.default.hash(password, 10);
        const user = yield models_1.User.create({ name, email, password: hash });
        const { password: string } = user, newUser = __rest(user, ["password"]);
        console.log(newUser);
        // delete userObject.password;
        res.status(201);
        res.send(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(400);
        res.send({ error, message: "Could not create user" });
    }
});
exports.registerUser = registerUser;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { "email", "password" }
        const { email, password } = req.body;
        const user = yield models_1.User.findOne({ email });
        if (user) {
            const validatedPass = yield bcrypt_1.default.compare(password, user.password);
            if (!validatedPass)
                throw new Error();
            const userObject = user.toObject();
            // delete userObject.password;
            res.send(userObject);
            res.status(202);
        }
    }
    catch (error) {
        res.send({ error, message: "Username or/and password is incorrect" });
        res.status(401);
    }
});
exports.logIn = logIn;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { USER }
        const userChanges = req.body;
        console.log(userChanges);
        const userId = userChanges._id;
        const updatedUser = yield models_1.User.findByIdAndUpdate(userId, { $set: userChanges }, { new: true });
        res.status(202);
        res.send(updatedUser);
    }
    catch (error) {
        res.status(500);
        res.send({ error, message: "Failed to update user" });
    }
});
exports.updateUser = updateUser;
