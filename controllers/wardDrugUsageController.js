import WardDrugUsage from "../models/WardDrugUsage.js";

export const newDrugUsage = async (req, res, next) => {
  const { date, wardId, drugId, batchNo, bhtNo, amount } = req.body;

  try {
    const drugUsage = await WardDrugUsage.create({
      date,
      wardId,
      drugId,
      batchNo,
      bhtNo,
      amount,
    });
    res.status(201).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug usage data not added" });
    next();
  }
};

export const getDrugUsage = async (req, res, next) => {
  try {
    const drugUsage = await WardDrugUsage.findById({
      date,
    });
    res.status(201).json({ status: "success", drugUsage: drugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug usage could not get" });
    next();
  }
};
