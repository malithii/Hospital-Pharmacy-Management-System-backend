import Inventory from "../models/Inventory.js";
import Notification from "../models/Notifications.js";

//expire date notificaton

export const expireDateNotification = async (req, res, next) => {
  const { user } = req.body;

  try {
    const inventory = await Inventory.findOne({ user: user });
    const userNotifications = await Notification.find({ user: user });
    const now = new Date();
    const next90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 30 days in milliseconds

    const expiringInventory = await Inventory.find({
      user: user,
      inventory: {
        $elemMatch: {
          batch: {
            $elemMatch: {
              expDate: { $lte: next90Days },
            },
          },
        },
      },
    }).populate("inventory.drug");

    const notifications = [];
    expiringInventory.forEach((inventory) => {
      inventory.inventory.forEach((item) => {
        item.batch.forEach((batch) => {
          if (batch.expDate <= next90Days) {
            const message = `The drug ${item.drug.drugId} with batch no ${
              batch.batchNo
            } is expiring soon (${batch.expDate.toDateString()})`;
            const notificationExists = userNotifications.find(
              (notification) => notification.message === message
            );
            if (!notificationExists) {
              notifications.push({
                user: inventory.user,
                message,
                state: "UNREAD",
              });
            }
          }
        });
      });
    });

    await Notification.create(notifications);

    res.status(201).json({ status: "success", notifications: notifications });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "notification data not created" });
    next();
  }
};

//get unread notifications

export const getUnreadNotifications = async (req, res, next) => {
  const { user } = req.body;

  try {
    const notifications = await Notification.find({
      user: user,
      state: "UNREAD",
    });

    res.status(200).json({ status: "success", notifications: notifications });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "notification data not created" });
    next();
  }
};

//READ notification

export const readNotification = async (req, res, next) => {
  const { user, _id } = req.body;

  try {
    const notification = await Notification.findOne({
      user: user,
      _id: _id,
    });
    notification.state = "READ";
    await notification.save();
    // console.log(notification);

    res.status(200).json({ status: "success", notification: notification });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "notification data not created" });
    next();
  }
};
