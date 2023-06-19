"use strict";

import { Request, Response } from "express";
import { mailAll } from "../services/service.email";
import { Category, User as TUser, } from "../models/interfaces";

import { Category as TCategory } from "../models/interfaces";
import { Item as TItem } from "../models/interfaces";
import { Category, User, Item } from "../models/models";

exports.sendEmail = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userid;

     let userData:TUser | null

     userData = await User.findById(userId);
     if (userData){
const userCat: TCategory[] | null = [...[userData.categories]];
     }
    
    

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

    // Populate categories

    res.status(200);
  } catch (error) {
    res.send(error.message);
    res.status(200);
  }
};
