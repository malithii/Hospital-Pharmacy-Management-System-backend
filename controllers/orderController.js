import Order from "../models/Order.js";

export const newOrder = async (req, res, next) => {
  const { date, drugName, quantity } = req.body;

  try {
    const order = await Order.create({
      date,
      drugName,
      quantity,
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
