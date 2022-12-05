import WardDrugUsage from "../models/WardDrugUsage.js";

export const newDrugUsage = async (req, res, next) => {
  const { date, wardNo, drugName, batchNo, bht, quantity } = req.body;

  try {
    const drugUsage = await WardDrugUsage.create({
      date,
      wardNo,
      drugName,
      batchNo,
      bht,
      quantity,
    });
    res.status(201).json({ status: "success", drugUsage: drugUsage });
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
