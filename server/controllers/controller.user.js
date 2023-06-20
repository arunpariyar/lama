"use strict";

const bcrypt = require("bcrypt");
const { User } = require("../models/models");

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const userObject = user.toObject();
    delete userObject.password;
    res.send(userObject);
    res.status(200);
  } catch (error) {
    res.status(500);
    error.message = "user doesnot exist in the database"
    res.send(error);
  }
};

exports.registerUser = async (req, res) => {
  try {
    // { "name", "email", "password" }
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const userObject = user.toObject();
    delete userObject.password;
    res.status(201);
    res.send(userObject);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send({ error, message: "Could not create user" });
  }
};

exports.logIn = async (req, res) => {
  try {
    // { "email", "password" }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    const userObject = user.toObject();
    delete userObject.password;
    res.send(userObject);
    res.status(202);
  } catch (error) {
    res.send({ error, message: "Username or/and password is incorrect" });
    res.status(401);
  }
};

exports.updateUser = async (req, res) => {
  try {
    // { USER }
    const userChanges = req.body;
    console.log(userChanges);
    const userId = userChanges._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: userChanges },
      { new: true }
    );
    res.status(202);
    res.send(updatedUser);
  } catch (error) {
    res.status(500);
    res.send({ error, message: "Failed to update user" });
  }
};
