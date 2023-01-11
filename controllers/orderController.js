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
    const order = await Order.find({}).populate("user");
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
    for (let i = 0; i < orderItems.length; i++) {
      const index = inventory.inventory.findIndex(
        (item) => item.drug.toString() === orderItems[i].drug.toString()
      );

      if (index !== -1) {
        const batchIndex = inventory.inventory[index].batch.findIndex(
          (item) => item.batchNo === orderItems[i].batch.batchNo
        );
        if (batchIndex !== -1) {
          inventory.inventory[index].batch[batchIndex].quantity =
            inventory.inventory[index].batch[batchIndex].quantity -
            orderItems[i].quantityOrdered;
        }
        inventory.inventory[index].quantityInStock =
          inventory.inventory[index].quantityInStock -
          orderItems[i].quantityOrdered;
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};
