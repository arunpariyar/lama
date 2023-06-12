'use strict';

const { User, Category } = require('../models/models');

exports.getCatById = async (ctx) => {
  try {
    const catId = ctx.params.id;
    ctx.body = await Category.findById(catId);
    ctx.status = 200;
  } catch (error) {
    ctx.body = error.message;
    ctx.status = 500;
  }
};

exports.createCat = async (ctx) => {
  try {
    // const [userId, name] = ctx.request.body;
    const userId = ctx.request.body.userId;
    const name = ctx.request.body.name;
    const user = await User.findById(userId);
    const newCat = await Category.create({ owner: userId, name });
    const newCatList = [...user.categories, newCat._id];
    await User.findByIdAndUpdate(userId, { $set: { categories: newCatList } });
    ctx.body = newCat;
    ctx.status = 200;
  } catch (error) {
    ctx.body = { error, message: 'Could not create category' };
    ctx.status = 500;
  }
};

exports.deleteCat = async (ctx) => {
  try {
    // { "userId": "6480a98535fbc7221e4f2eb2",
    //   "catId": "..." }
    const userId = ctx.request.body.userId;
    const catId = ctx.request.body.catId;
    const user = await User.findById(userId);
    const deletedCategory = await Category.findByIdAndDelete(catId);

    await User.findByIdAndUpdate(userId, {
      $set: { categories: user.categories.filter((cat) => cat.toString() !== catId) },
    });
    ctx.body = deletedCategory;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error.message;
    ctx.status = 500;
  }
};

exports.updateCat = async (ctx) => {
  try {
    // { "_id": "6482e3a99d1f99e48569793d",
    //   "name": "Household v2",
    //   "color": "yellow" }
    const catChanges = ctx.request.body;
    const catId = catChanges._id;
    const updatedCategory = await Category.findByIdAndUpdate(
      catId,
      { $set: catChanges },
      { new: true }
    );
    ctx.body = updatedCategory;
    ctx.status = 200;
  } catch (error) {
    ctx.body = error.message;
    ctx.status = 500;
  }
};
