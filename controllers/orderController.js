import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";

export const newOrder = async (req, res, next) => {
  const { user, date, orderItems } = req.body;

  try {
    const order = await Order.create({
      user,
      date,
      orderItems,
    });

    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "order not created" });
    next();
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({});
    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

export const acceptOrder = async (req, res, next) => {
  const { user, _id, orderItems } = req.body;

  try {
    const order = await Order.findById(_id);
    order.status = "ACCEPTED";
    const inventory = await Inventory.findOne({ user: user }); //user pharmacist
    for (let i = 0; i < orderItems.length; i++) {}
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
