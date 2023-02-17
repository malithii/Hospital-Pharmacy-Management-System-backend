import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";

export const newOrder = async (req, res, next) => {
  const { wardUser, date, orderItems } = req.body;

  try {
    const order = await Order.create({
      wardUser,
      date,
      orderItems,
    });

    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "order not created" });
    next();
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({}).populate("pharmacist wardUser");
    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

export const getPendingOrders = async (req, res, next) => {
  try {
    const order = await Order.find({ status: "PENDING" }).populate(
      "orderItems.drug pharmacist wardUser"
    );
    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

export const acceptOrder = async (req, res, next) => {
  const { pharmacist, wardUser, _id, orderItems } = req.body;

  try {
    const order = await Order.findById(_id);
    order.status = "ACCEPTED";
    const inventory = await Inventory.findOne({ user: pharmacist }); //user pharmacist
    for (let i = 0; i < orderItems.length; i++) {
      const index = inventory.inventory.findIndex(
        (item) => item.drug.toString() === orderItems[i].drug.toString()
      );
      for (let j = 0; j < orderItems[i].issueDrugs.length; j++) {
        const batchIndex = inventory.inventory[index].batch.findIndex(
          (item) => item.batchNo === orderItems[i].issueDrugs[j].batch
        );
        if (batchIndex !== -1) {
          inventory.inventory[index].batch[batchIndex].quantity =
            inventory.inventory[index].batch[batchIndex].quantity -
            orderItems[i].issueDrugs[j].quantityIssued;
        }
        inventory.inventory[index].quantityInStock =
          inventory.inventory[index].quantityInStock -
          orderItems[i].issueDrugs[j].quantityIssued;

        // order.orderItems[i].totalIssued =
        //   order.orderItems[i].totalIssued +
        //   orderItems[i].issueDrugs[j].quantityIssued;
      }
      console.log(orderItems[i].drug);
      const orderItemIndex = order.orderItems.findIndex(
        (item) => item.drug.toString() === orderItems[i].drug.toString()
      );
      if (orderItemIndex === -1) {
        throw new Error("order item not found");
      }
      order.orderItems[orderItemIndex].issueDrugs.push(
        ...orderItems[i].issueDrugs
      );

      // if (index !== -1) {
      //   const batchIndex = inventory.inventory[index].batch.findIndex(
      //     (item) => item.batchNo === orderItems[i].batch.batchNo
      //   );
      //   if (batchIndex !== -1) {
      //     inventory.inventory[index].batch[batchIndex].quantity =
      //       inventory.inventory[index].batch[batchIndex].quantity -
      //       orderItems[i].quantityOrdered;
      //   }
      //   inventory.inventory[index].quantityInStock =
      //     inventory.inventory[index].quantityInStock -
      //     orderItems[i].quantityOrdered;
      // }
    }
    await inventory.save();
    await order.save();
    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

//save quantity received

export const saveQuantityReceived = async (req, res, next) => {
  const { pharmacist, wardUser, _id, orderItems } = req.body;
  try {
    const order = await Order.findById(_id);
    order.status = "DELIVERED";
    const inventory = await Inventory.findOne({ user: wardUser }); //user wardUser
    for (let i = 0; i < orderItems.length; i++) {
      const index = inventory.inventory.findIndex(
        (item) => item.drug.toString() === orderItems[i].drug.toString()
      );
      if (index !== -1) {
        const batchIndex = inventory.inventory[index].batch.findIndex(
          (item) => item.batchNo === orderItems[i].batch.batchNo
        );
        if (batchIndex !== -1) {
          inventory.inventory[index].batch[batchIndex].quantity =
            inventory.inventory[index].batch[batchIndex].quantity +
            orderItems[i].quantityReceived;
        }
        inventory.inventory[index].quantityInStock =
          inventory.inventory[index].quantityInStock +
          orderItems[i].quantityReceived;
      }
      console.log(orderItems[i].drug);
      const orderItemIndex = order.orderItems.findIndex(
        (item) => item.drug.toString() === orderItems[i].drug.toString()
      );
      if (orderItemIndex === -1) {
        throw new Error("order item not found");
      }
      //update quantityreceived in issuedrugs array

      for (let j = 0; j < orderItems[i].issueDrugs.length; j++) {
        const issueDrugIndex = order.orderItems[
          orderItemIndex
        ].issueDrugs.findIndex(
          (item) => item.batch === orderItems[i].issueDrugs[j].batch
        );
        if (issueDrugIndex === -1) {
          throw new Error("issue drug not found");
        }
        order.orderItems[orderItemIndex].issueDrugs[
          issueDrugIndex
        ].quantityRecieved = orderItems[i].issueDrugs[j].quantityRecieved;
      }
    }
    await inventory.save();
    await order.save();
    res.status(200).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

//issue drugs using nearest expiry date batch

export const issueDrugs = async (req, res, next) => {
  const { pharmacist, wardUser, _id, orderItems } = req.body;
  try {
    const order = await Order.findById(_id);
    order.status = "ACCEPTED";
    const inventory = await Inventory.findOne({ user: pharmacist }); //user pharmacist
    for (let i = 0; i < orderItems.length; i++) {
      const index = inventory.inventory.findIndex(
        (item) => item.drug.toString() === orderItems[i].drug.toString()
      );
      if (index !== -1) {
        const batchIndex = inventory.inventory[index].batch.findIndex(
          (item) => item.batchNo === orderItems[i].batch.batchNo
        );
        if (batchIndex !== -1) {
          inventory.inventory[index].batch[batchIndex].quantity =
            inventory.inventory[index].batch[batchIndex].quantity -
            orderItems[i].quantityOrdered;
        }
        inventory.inventory[index].quantityInStock =
          inventory.inventory[index].quantityInStock -
          orderItems[i].quantityOrdered;
      }
    }
    await inventory.save();
    await order.save();
    res.status(201).json({ status: "success", order: order });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};
