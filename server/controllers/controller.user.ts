"use strict";
import { Request, Response } from "express";

import bcrypt from "bcrypt";
import { User } from "../models/models";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select({ password: 0 });
    res.send(user);
    res.status(200);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    // { "name", "email", "password" }
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    // delete userObject.password;
    res.status(201);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send({ error, message: "Could not create user" });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    // { "email", "password" }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const validatedPass = await bcrypt.compare(password, user.password!);
      if (!validatedPass) throw new Error();
      const userObject = user.toObject();
      // delete userObject.password;
      res.send(userObject);
      res.status(202);
    }
  } catch (error) {
    res.send({ error, message: "Username or/and password is incorrect" });
    res.status(401);
  }
};

export const updateUser = async (req: Request, res: Response) => {
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
