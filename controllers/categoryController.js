import mongoose from "mongoose";
import Category from "../models/Category.js";
import Drugs from "../models/Drug.js";

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

export const drugCategoryChart = async (req, res, next) => {
  try {
    const drug = await Drugs.aggregate([
      {
        $lookup: {
          from: "categories", //model
          localField: "category", //field in current model
          foreignField: "_id", //field in other model
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$category.name",
          count: { $sum: 1 },
        },
      },
      // {
      //   $lookup: {
      //     from: "drugs", //model
      //     localField: "_id", //field in current model
      //     foreignField: "_id", //field in other model
      //     as: "drug",
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$category",
      //     count: { $sum: 1 },
      //   },
      // },
    ]);
    res.status(201).json({ status: "success", drug: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find drugs" });
    next();
  }
};

export const updateCategory = async (req, res, next) => {
  const { _id, name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate({ _id }, { name });
    res.status(200).json({ status: "success", category: category });
  } catch (error) {
    res.status(400).json({ error: "category not updated" });
    next();
  }
};
