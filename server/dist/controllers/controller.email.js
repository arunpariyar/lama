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
Object.defineProperty(exports, "__esModule", { value: true });
const service_email_1 = require("../services/service.email");
const models_1 = require("../models/models");
exports.sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userid;
        const userData = yield models_1.User.findById(userId);
        // Populate categories
        const userCat = [...userData.categories];
        for (let i = 0; i < userCat.length; i++) {
            userCat[i] = yield models_1.Category.findById(userCat[i]);
        }
        userData.categories = userCat;
        // Populate items in categories
        for (let i = 0; i < userData.categories.length; i++) {
            const catItems = [...userData.categories[i].items];
            for (let j = 0; j < userData.categories[i].items.length; j++) {
                catItems[j] = yield models_1.Item.findById(catItems[j]);
            }
            userData.categories[i].items = catItems;
        }
        (0, service_email_1.mailAll)(userData);
        res.status(200);
    }
    catch (error) {
        res.send(error.message);
        res.status(200);
    }
});
