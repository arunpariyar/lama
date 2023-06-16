"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = exports.Category = exports.User = void 0;
const index_1 = __importDefault(require("./index"));
const Schema = index_1.default.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    notif_due: { type: Boolean, default: false },
    notif_opt: { type: Boolean, default: false },
    notif_freq: { type: Number, default: 1 },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});
const CategorySchema = new Schema({
    name: String,
    color: { type: String, default: "cat-def" },
    items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
});
const ItemSchema = new Schema({
    title: String,
    start_date: { type: Date, default: null },
    checked: { type: Boolean, default: false },
    freq_weeks: { type: Number, default: "0" },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
});
const User = index_1.default.model("User", UserSchema);
exports.User = User;
const Category = index_1.default.model("Category", CategorySchema);
exports.Category = Category;
const Item = index_1.default.model("Item", ItemSchema);
exports.Item = Item;
