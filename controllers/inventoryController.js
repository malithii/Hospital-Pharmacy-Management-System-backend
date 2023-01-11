import Inventory from "../models/Inventory.js";

export const newInventory = async (req, res, next) => {
  const { user } = req.body;

  try {
    const newInventory = await Inventory.create({
      user,
    });

    const drug = await Inventory.findById(newInventory._id).populate(
      "inventory.drug"
    );

    res.status(201).json({ status: "success", inventory: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "inventory data not created" });
    next();
  }
};

export const getInventory = async (req, res, next) => {
  const { user } = req.body;

  try {
    const inventory = await Inventory.findOne({ user: user }).populate(
      "inventory.drug"
    );

    res.status(201).json({ status: "success", inventory: inventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};

export const getAllInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({}).populate("inventory.drug");

    res.status(201).json({ status: "success", inventory: inventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};
