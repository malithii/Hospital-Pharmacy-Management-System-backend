import StoreTemp from "../models/StoreTemp.js";

export const newStoreTemp = async (req, res, next) => {
  const { name, range } = req.body;
  try {
    const storeTemp = await StoreTemp.create({
      name,
      range,
    });
    res.status(201).json({ status: "success", storeTemp: storeTemp });
  } catch (error) {
    res.status(400).json({ error: "storeTemp not created" });
    next();
  }
};

export const getAllStoreTemps = async (req, res, next) => {
  try {
    const storeTemps = await StoreTemp.find({});
    res.status(201).json({ status: "success", storeTemps: storeTemps });
  } catch (error) {
    res.status(400).json({ error: "could not find storeTemps" });
    next();
  }
};
