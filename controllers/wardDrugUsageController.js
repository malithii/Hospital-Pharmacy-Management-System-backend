import mongoose from "mongoose";
import Inventory from "../models/Inventory.js";
import WardDrugUsage from "../models/WardDrugUsage.js";

export const newDrugUsage = async (req, res, next) => {
  const { user, date, drug, batchNo, bht, quantitytoBHT, quantityfromBHT } =
    req.body;

  try {
    const usage = await WardDrugUsage.create({
      user,
      date,
      drug,
      batchNo,
      bht,
      quantitytoBHT,
      quantityfromBHT,
    });
    //TODO: avoid saving minus values
    const inventory = await Inventory.findOne({ user: user });

    const index = inventory.inventory.findIndex(
      (item) => item.drug.toString() === drug.toString() //String or Number?
    );

    if (index !== -1) {
      const batchIndex = inventory.inventory[index].batch.findIndex(
        (item) => item.batchNo === batchNo
      );
      if (batchIndex !== -1) {
        inventory.inventory[index].batch[batchIndex].quantity =
          inventory.inventory[index].batch[batchIndex].quantity - quantitytoBHT;
      }
      inventory.inventory[index].quantityInStock =
        inventory.inventory[index].quantityInStock - quantitytoBHT;
    }

    await inventory.save();

    res.status(201).json({ status: "success", usage: usage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug usage data not added" });
    next();
  }
};

export const getALLDrugUsage = async (req, res, next) => {
  const { user } = req.body;
  try {
    const drugUsage = await WardDrugUsage.find({ user }).populate("drug");

    res.status(201).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find drug usage details" });
    next();
  }
};

export const getDrugUsageByMonth = async (req, res, next) => {
  const { user } = req.body;
  try {
    const drugUsage = await WardDrugUsage.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
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
        $group: {
          _id: {
            drug: "$drug",
            month: { $month: "$date" },
          },
          total: { $sum: "$quantitytoBHT" },
        },
      },
      {
        $project: {
          _id: 0,
          drug: "$_id.drug",
          month: "$_id.month",
          total: 1,
        },
      },
    ]);
    console.log(drugUsage);

    res.status(200).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find drug usage details" });
    next();
  }
};

export const viewDrugUsageByDate = async (req, res, next) => {
  const { user, date } = req.body;
  try {
    const drugUsage = await WardDrugUsage.find({ user, date }).populate("drug");

    res.status(200).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find drug usage details" });
    next();
  }
};
