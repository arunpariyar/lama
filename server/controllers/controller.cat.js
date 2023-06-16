"use strict";

const { User, Category } = require("../models/models");

exports.getCatById = async (req, res) => {
  try {
    const catId = req.params.id;
    res.send(await Category.findById(catId));
    res.status(200);
  } catch (error) {
    res.send(error.message);
    res.status(500);
  }
};

exports.createCat = async (req, res) => {
  try {
    // { "userId", "name" }
    const userId = req.body.userId;
    const name = req.body.name;
    const user = await User.findById(userId);
    const newCat = await Category.create({ owner: userId, name });
    const newCatList = [...user.categories, newCat._id];
    await User.findByIdAndUpdate(userId, { $set: { categories: newCatList } });
    res.send(newCat);
    res.status(201);
  } catch (error) {
    res.send({ error, message: "Could not create category" });
    res.status(400);
  }
};

exports.deleteCat = async (req, res) => {
  try {
    // { "userId", "catId" }
    const userId = req.body.userId;
    const catId = req.body.catId;
    const user = await User.findById(userId);
    const deletedCategory = await Category.findByIdAndDelete(catId);

    await User.findByIdAndUpdate(userId, {
      $set: {
        categories: user.categories.filter((cat) => cat.toString() !== catId),
      },
    });
    res.send(deletedCategory);
    res.status(202);
  } catch (error) {
    res.send(error.message);
    res.status(500);
  }
};

exports.updateCat = async (req, res) => {
  try {
    // { CATEGORY }
    const catChanges = req.body;
    const catId = catChanges._id;
    const updatedCategory = await Category.findByIdAndUpdate(
      catId,
      { $set: catChanges },
      { new: true }
    );
    res.send(updatedCategory);
    res.send(202);
  } catch (error) {
    res.send(error.message);
    res.status(500);
  }
};
