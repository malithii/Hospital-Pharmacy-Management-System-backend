import Category from "../models/Category.js";
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
      "inventory.drug user"
    );
    for (let i = 0; i < inventory.inventory.length; i++) {
      const category = await Category.findById(
        inventory.inventory[i].drug.category
      );
      inventory.inventory[i].drug.category = category;
    }

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

export const getWardInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          "user.type": "PHARMACIST",
        },
      },
    ]);

    res.status(200).json({ status: "success", inventory: inventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};
