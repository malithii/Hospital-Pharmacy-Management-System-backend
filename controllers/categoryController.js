import mongoose from "mongoose";
import Category from "../models/Category.js";

export const newCategory = async (req, res, next) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name,
    });
    res.status(201).json({ status: "success", category: category });
  } catch (error) {
    res.status(400).json({ error: "category not created" });
    next();
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}, { name: 1 });
    res.status(201).json({ status: "success", categories: categories });
  } catch (error) {
    res.status(400).json({ error: "could not find categories" });
    next();
  }
};
