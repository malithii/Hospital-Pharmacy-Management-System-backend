import mongoose from "mongoose";
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
    // console.log(inventory.inventory.length);
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
          "user.type": "WARDUSER",
        },
      },
      {
        $sort: {
          "user.wardNo": 1,
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

//get nearest expire date drugs in inventory

export const getNearestExpireDates = async (req, res, next) => {
  const { user } = req.body;

  try {
    // const inventory = await Inventory.findOne({ user: user }).populate(
    //   "inventory.drug"
    // );
    const date = new Date();
    const nearestEpireDates = await Inventory.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
        },
      },
      {
        $unwind: "$inventory",
      },
      {
        $unwind: "$inventory.batch",
      },

      {
        $project: {
          _id: 0,
          drug: "$inventory.drug",
          batch: "$inventory.batch.batchNo",
          expireDate: "$inventory.batch.expDate",
          quantity: "$inventory.batch.quantity",
        },
      },
      {
        $lookup: {
          from: "drugs", //model
          localField: "drug", //field in current model
          foreignField: "_id", //field in other model
          as: "drug",
        },
      },
      {
        $unwind: "$drug",
      },
      {
        $project: {
          drug: "$drug.drugId",
          batch: "$batch",
          expireDate: "$expireDate",
          quantity: "$quantity",
        },
      },
      {
        $sort: {
          expireDate: 1,
        },
      },
      {
        $match: {
          expireDate: {
            $gte: new Date(),
            $lte: new Date(date.setDate(date.getDate() + 365)),
          },
        },
      },
    ]);

    res.status(200).json({ status: "success", inventory: nearestEpireDates });
    // console.log(date);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};

export const inventoryChart = async (req, res, next) => {
  const { user } = req.body;

  try {
    const inventory = await Inventory.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
        },
      },
      {
        $unwind: "$inventory",
      },
      {
        $project: {
          _id: 0,
          user: 0,
        },
      },
      {
        $unwind: "$inventory.batch",
      },
      {
        $project: {
          drug: "$inventory.drug",
          quantity: "$inventory.quantityInStock",
          reorderLevel: "$inventory.reorderLevel",
        },
      },
      {
        $lookup: {
          from: "drugs", //model
          localField: "drug", //field in current model
          foreignField: "_id", //field in other model
          as: "drug",
        },
      },
      {
        $unwind: "$drug",
      },
      {
        $project: {
          drug: "$drug.drugId",
          quantity: "$quantity",
          reorderLevel: "$reorderLevel",
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

//enter reorder levels

export const newReorderLevel = async (req, res, next) => {
  const { user, drug, reorderLevel } = req.body;

  try {
    const inventory = await Inventory.findOne({ user: user });

    const drugIndex = inventory.inventory.findIndex(
      (item) => item.drug == drug
    );
    if (drugIndex == -1) {
      return res.status(400).json({ error: "cannot find drug" });
    }
    inventory.inventory[drugIndex].reorderLevel = reorderLevel;

    await inventory.save();

    res.status(201).json({ status: "success", inventory: inventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};

//update reorder levels

export const updateReorderLevel = async (req, res, next) => {
  const { user, drug, reorderLevel } = req.body;

  try {
    const inventory = await Inventory.findOne({ user: user });

    const drugIndex = inventory.inventory.findIndex(
      (item) => item.drug == drug
    );
    if (drugIndex == -1) {
      return res.status(400).json({ error: "cannot find drug" });
    }
    inventory.inventory[drugIndex].reorderLevel = reorderLevel;

    await inventory.save();

    res.status(201).json({ status: "success", inventory: inventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};

//get drug quantityinstock less than reorder level

export const getReorderLevelDrugs = async (req, res, next) => {
  const { user } = req.body;

  try {
    const inventory = await Inventory.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
        },
      },
      {
        $unwind: "$inventory",
      },
      {
        $project: {
          _id: 0,
          user: 0,
        },
      },
      {
        $unwind: "$inventory.batch",
      },
      {
        $project: {
          drug: "$inventory.drug",
          quantity: "$inventory.quantityInStock",
          reorderLevel: "$inventory.reorderLevel",
        },
      },
      {
        $lookup: {
          from: "drugs", //model
          localField: "drug", //field in current model
          foreignField: "_id", //field in other model
          as: "drug",
        },
      },
      {
        $unwind: "$drug",
      },
      {
        $project: {
          drug: "$drug.drugId",
          quantity: "$quantity",
          reorderLevel: "$reorderLevel",
          isLowStock: { $lt: ["$quantity", "$reorderLevel"] },
        },
      },
      //get only drugs with quantity less than reorder level
      {
        $match: {
          isLowStock: true,
        },
      },
      {
        $project: {
          isLowStock: 0,
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

//check a batch and quantiry order is available in inventory

export const checkBatchQuantity = async (req, res, next) => {
  const { user, drug, batch, quantity } = req.body;

  try {
    const inventory = await Inventory.findOne({ user: user });

    const drugIndex = inventory.inventory.findIndex(
      (item) => item.drug == drug
    );
    if (drugIndex !== -1) {
      const batchIndex = inventory.inventory[drugIndex].batch.findIndex(
        (item) => item.batchNo == batch
      );

      if (batchIndex !== -1) {
        if (
          inventory.inventory[drugIndex].batch[batchIndex].quantity >= quantity
        ) {
          return res
            .status(200)
            .json({ status: "success", inventory: inventory });
        } else {
          return res.status(400).json({ error: "quantity not available" });
        }
      } else {
        return res.status(400).json({ error: "batch not available" });
      }
    } else {
      return res.status(400).json({ error: "drug not available" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};

//get inventory by drug

export const getInventoryByDrug = async (req, res, next) => {
  const { user, drug } = req.body;

  try {
    const inventory = await Inventory.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
        },
      },
      {
        $unwind: "$inventory",
      },
      {
        $project: {
          _id: 0,
          user: 0,
        },
      },
      {
        $match: {
          "inventory.drug": mongoose.Types.ObjectId(drug),
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
