"use strict";

const { mailAll } = require("../services/service.email");
const { User, Category, Item } = require("../models/models");

exports.sendEmail = async (req, res) => {
  try {
    const userId = req.params.userid;
    const userData = await User.findById(userId);

    // Populate categories
    const userCat = [...userData.categories];
    for (let i = 0; i < userCat.length; i++) {
      userCat[i] = await Category.findById(userCat[i]);
    }
    userData.categories = userCat;

    // Populate items in categories
    for (let i = 0; i < userData.categories.length; i++) {
      const catItems = [...userData.categories[i].items];
      for (let j = 0; j < userData.categories[i].items.length; j++) {
        catItems[j] = await Item.findById(catItems[j]);
      }
      userData.categories[i].items = catItems;
    }

    mailAll(userData);

    res.status(200);
  } catch (error) {
    res.send(error.message);
    res.status(200);
  }
};
