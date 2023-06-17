"use strict";

import { Request, Response } from "express";
import { Category, Item } from "../models/models";

exports.getItemById = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);
    res.send(item);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(500);
  }
};

exports.createItem = async (req: Request, res: Response) => {
  try {
    // { "catId", "content" : { ITEM OBJECT } }
    const catId = req.body.catId;
    const title = req.body.title;
    const cat = await Category.findById(catId);
    if (cat) {
      const newItem = await Item.create({ parent: catId, title });
      const newItemList = [...cat.items, newItem._id];
      await Category.findByIdAndUpdate(catId, { $set: { items: newItemList } });
      res.send(newItem);
      res.status(201);
    }
  } catch (error) {
    res.send(error);
    res.status(400);
  }
};

exports.deleteItem = async (req: Request, res: Response) => {
  try {
    // { "catId", "itemId" }
    const catId = req.body.catId;
    const itemId = req.body.itemId;
    const category = await Category.findById(catId);
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (category) {
      await Category.findByIdAndUpdate(catId, {
        $set: {
          items: category.items.filter((item) => item.toString() !== itemId),
        },
      });
    }

    res.send(deletedItem);
    res.status(202);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.send(500);
  }
};

exports.updateItem = async (req: Request, res: Response) => {
  try {
    // { ITEM OBJECT }
    const itemChanges = req.body;
    const itemId = itemChanges._id;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { $set: itemChanges },
      { new: true }
    );
    res.send(updatedItem);
    res.status(202);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    }
    res.send(500);
  }
};
