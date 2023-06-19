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
const models_1 = require("../models/models");
exports.getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.id;
        const item = yield models_1.Item.findById(itemId);
        res.send(item);
        res.status(200);
    }
    catch (error) {
        res.send(error);
        res.status(500);
    }
});
exports.createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { "catId", "content" : { ITEM OBJECT } }
        const catId = req.body.catId;
        const title = req.body.title;
        const cat = yield models_1.Category.findById(catId);
        if (cat) {
            const newItem = yield models_1.Item.create({ parent: catId, title });
            const newItemList = [...cat.items, newItem._id];
            yield models_1.Category.findByIdAndUpdate(catId, { $set: { items: newItemList } });
            res.send(newItem);
            res.status(201);
        }
    }
    catch (error) {
        res.send(error);
        res.status(400);
    }
});
exports.deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { "catId", "itemId" }
        const catId = req.body.catId;
        const itemId = req.body.itemId;
        const category = yield models_1.Category.findById(catId);
        const deletedItem = yield models_1.Item.findByIdAndDelete(itemId);
        if (category) {
            yield models_1.Category.findByIdAndUpdate(catId, {
                $set: {
                    items: category.items.filter((item) => item.toString() !== itemId),
                },
            });
        }
        res.send(deletedItem);
        res.status(202);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
        res.send(500);
    }
});
exports.updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // { ITEM OBJECT }
        const itemChanges = req.body;
        const itemId = itemChanges._id;
        const updatedItem = yield models_1.Item.findByIdAndUpdate(itemId, { $set: itemChanges }, { new: true });
        res.send(updatedItem);
        res.status(202);
    }
    catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        }
        res.send(500);
    }
});
