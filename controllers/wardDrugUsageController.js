import WardDrugUsage from "../models/WardDrugUsage.js";

export const newDrugUsage = async (req, res, next) => {
  const { user, date, drugUsage } = req.body;

  try {
    const usage = await WardDrugUsage.create({
      user,
      date,
      drugUsage,
    });
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
