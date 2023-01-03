import Inventory from "../models/Inventory.js";

export const newInventory = async (req, res, next) => {
  const { user, inventory } = req.body;

  try {
    const newInventory = await Inventory.create({
      user,
      inventory,
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
