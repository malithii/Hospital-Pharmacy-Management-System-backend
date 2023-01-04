import Inventory from "../models/Inventory.js";
import WardDrugUsage from "../models/WardDrugUsage.js";

export const newDrugUsage = async (req, res, next) => {
  const { user, date, drugName, batchNo, bht, quantity } = req.body;

  try {
    const usage = await WardDrugUsage.create({
      user,
      date,
      drugName,
      batchNo,
      bht,
      quantity,
    });

    const inventory = await Inventory.findOne({ user: user });

    const index = inventory.inventory.findIndex(
      (item) => item.drug.toString() === drugName.toString()
    );

    if (index !== -1) {
      const batchIndex = inventory.inventory[index].batch.findIndex(
        (item) => item.batchNo === batchNo
      );
      if (batchIndex !== -1) {
        inventory.inventory[index].batch[batchIndex].quantity =
          inventory.inventory[index].batch[batchIndex].quantity - quantity;
      }
      inventory.inventory[index].quantityInStock =
        inventory.inventory[index].quantityInStock - quantity;
    }

    await inventory.save();

    res.status(201).json({ status: "success", usage: usage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug usage data not added" });
    next();
  }
};

export const getDrugUsageByDate = async (req, res, next) => {
  try {
    const { date, wardNo } = req.body;
    const drugUsage = await WardDrugUsage.find({ date, wardNo }, { wardNo: 0 });
    res.status(201).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug usage could not get" });
    next();
  }
};

export const allDrugUsages = async (req, res, next) => {
  const { wardNo } = req.body;
  try {
    const drugUsage = await WardDrugUsage.find({ wardNo });

    res.status(201).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Could not find drug usage details" });
    next();
  }
};
