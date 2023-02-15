import Inventory from "../models/Inventory.js";
import Notifications from "../models/Notifications.js";

//expire date notificaton

export const expireDateNotification = async (req, res, next) => {
  const { user } = req.body;

  try {
    const inventory = await Inventory.findOne({ user: user });

    res.status(201).json({ status: "success", notifications: drug });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "notification data not created" });
    next();
  }
};
