"use strict";

const { Category, Item } = require("../models/models");

exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    res.send(await Item.findById(itemId));
    res.status(200);
  } catch (error) {
    res.send(error.message);
    res.status = 500;
  }
};

exports.createItem = async (req, res) => {
  try {
    // { "catId", "content" : { ITEM OBJECT } }
    const catId = req.body.catId;
    const title = req.body.title;
    const cat = await Category.findById(catId);
    const newItem = await Item.create({ parent: catId, title });
    const newItemList = [...cat.items, newItem._id];
    await Category.findByIdAndUpdate(catId, { $set: { items: newItemList } });
    res.send(newItem);
    res.status(201);
  } catch (error) {
    res.send(error.message);
    res.status(400);
  }
};

exports.deleteItem = async (ctx) => {
  try {
    // { "catId", "itemId" }
    const catId = ctx.request.body.catId;
    const itemId = ctx.request.body.itemId;
    const category = await Category.findById(catId);
    const deletedItem = await Item.findByIdAndDelete(itemId);

    await Category.findByIdAndUpdate(catId, {
      $set: {
        items: category.items.filter((item) => item.toString() !== itemId),
      },
    });

    ctx.body = deletedItem;
    ctx.status = 202;
  } catch (error) {
    ctx.body = error.message;
    ctx.status = 500;
  }
};

exports.updateItem = async (ctx) => {
  try {
    // { ITEM OBJECT }
    const itemChanges = ctx.request.body;
    const itemId = itemChanges._id;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { $set: itemChanges },
      { new: true }
    );
    ctx.body = updatedItem;
    ctx.status = 202;
  } catch (error) {
    ctx.body = error.message;
    ctx.status = 500;
  }
};
