import Drugs from "../models/Drugs.js";

export const newDrug = async (req, res, next) => {
  const { drugId, drugName, category, description, level, storeTemp } =
    req.body;

  try {
    const drug = await Drugs.create({
      drugId,
      drugName,
      category,
      description,
      level,
      storeTemp,
    });
    res.status(201).json({ status: "success", drug: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug data not created" });
    next();
  }
};

export const updateDrug = async (req, res, next) => {
  const { _id, drugId, drugName, category, description, level, storeTemp } =
    req.body;

  try {
    const drug = await Drugs.findByIdAndUpdate(
      {
        _id: _id,
      },
      {
        drugId,
        drugName,
        category,
        description,
        level,
        storeTemp,
      }
    );
    res.status(201).json({ status: "success", drug: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug data not updated" });
    next();
  }
};

export const removeDrug = async (req, res, next) => {
  const { drugId } = req.body;

  try {
    const drug = await Drugs.deleteOne({
      drugId,
    });
    res.status(201).json({ status: "success", drug: "drug deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "drug data not deleted" });
    next();
  }
};

export const getAlldrugs = async (req, res, next) => {
  try {
    const drug = await Drugs.find({});
    res.status(201).json({ status: "success", drug: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find drugs" });
    next();
  }
};
