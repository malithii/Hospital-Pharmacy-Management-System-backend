import mongoose from "mongoose";
import Inventory from "../models/Inventory.js";
import Order from "../models/Order.js";
import WardDrugUsage from "../models/WardDrugUsage.js";

//drug issue report
export const drugIssueReport = async (req, res, next) => {
  const { pharmacist, month, year } = req.body;
  try {
    const orders = await Order.aggregate([
      {
        $match: {
          pharmacist: mongoose.Types.ObjectId(pharmacist),
        },
      },
      //get pending and accepted orders
      {
        $match: {
          $or: [{ status: "DELIVERED" }, { status: "ACCEPTED" }],
          //   status: "ACCEPTED",
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $project: {
          _id: 0,
          orderItems: 1,
          date: 1,
          updatedAt: 1,
          status: 1,
        },
      },
      {
        $project: {
          drug: "$orderItems.drug",
          quantity: "$orderItems.totalIssued",
          date: 1,
          updatedAt: 1,
          status: 1,
        },
      },
      {
        $lookup: {
          from: "drugs", //model
          localField: "drug", //field in current model
          foreignField: "_id", //field in other model
          as: "drug",
        },
      },
      {
        $unwind: "$drug",
      },
      {
        $project: {
          drug: "$drug.drugId",
          quantity: "$quantity",
          date: 1,
          updatedAt: 1,
          status: 1,
        },
      },
      //   // get in this month and year
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$updatedAt" }, month],
            $eq: [{ $year: "$updatedAt" }, year],
          },
        },
      },
      {
        $group: {
          _id: {
            drug: "$drug",
          },
          total: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          drug: "$_id.drug",
          total: 1,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
    ]);
    res.status(200).json({ status: "success", orders: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

//ward drug usage report

export const wardDrugUsageReport = async (req, res, next) => {
  const { user, month, year } = req.body;

  try {
    const wardDrugUsage = await WardDrugUsage.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
        },
      },
      {
        $project: {
          _id: 0,
          user: 0,
          batchNo: 0,
          bht: 0,
        },
      },
      {
        $project: {
          drug: "$drug",
          quantitytoBHT: "$quantitytoBHT",
          quantityfromBHT: "$quantityfromBHT",
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          month: month,
          year: year,
        },
      },
      {
        $group: {
          _id: {
            drug: "$drug",
          },
          total: { $sum: "$quantitytoBHT" },
        },
      },
      {
        $project: {
          drug: "$_id.drug",
          total: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          total: -1,
        },
      },
      {
        $lookup: {
          from: "drugs", //model
          localField: "drug", //field in current model
          foreignField: "_id", //field in other model
          as: "drug",
        },
      },
      {
        $unwind: "$drug",
      },
    ]);
    res.status(200).json({ status: "success", wardDrugUsage: wardDrugUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "could not find orders" });
    next();
  }
};

//inventory report

export const inventoryReport = async (req, res, next) => {
  const { user } = req.body;

  try {
    const inventory = await Inventory.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(user),
        },
      },
      {
        $unwind: "$inventory",
      },
      {
        $project: {
          _id: 0,
          user: 0,
        },
      },

      {
        $project: {
          drug: "$inventory.drug",
          batch: "$inventory.batch",
          quantity: "$inventory.quantityInStock",
          reorderLevel: "$inventory.reorderLevel",
        },
      },
      {
        $lookup: {
          from: "drugs", //model
          localField: "drug", //field in current model
          foreignField: "_id", //field in other model
          as: "drug",
        },
      },
      {
        $unwind: "$drug",
      },
      {
        $project: {
          drug: "$drug.drugId",
          batch: "$batch",
          quantity: "$quantity",
          reorderLevel: "$reorderLevel",
        },
      },

      // {
      //   $unwind: "$drug",
      // },
      // {
      //   $project: {
      //     drug: "$drug.drugId",
      //     quantity: "$quantity",
      //     reorderLevel: "$reorderLevel",
      //   },
      // },
    ]);

    res.status(200).json({ status: "success", inventory: inventory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get inventory data" });
    next();
  }
};

//drug usage chart

export const pharmacyDrugUsageChart = async (req, res, next) => {
  const { pharmacist, month, year, drug } = req.body;

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          pharmacist: mongoose.Types.ObjectId(pharmacist),
        },
      },
      {
        $unwind: "$orderItems",
      },
      //get accepted or delivered orders
      {
        $match: {
          $or: [{ status: "DELIVERED" }, { status: "ACCEPTED" }],
        },
      },
      {
        $project: {
          _id: 1,
          orderItems: 1,
          date: 1,
          updatedAt: 1,
          status: 1,
        },
      },
      {
        $match: {
          "orderItems.drug": mongoose.Types.ObjectId(drug),
        },
      },
      {
        $project: {
          quantity: "$orderItems.totalIssued",
          date: 1,
          drug: "$orderItems.drug",
          updatedAt: 1,
          _id: 1,
          month: { $month: "$updatedAt" },
          year: { $year: "$updatedAt" },
        },
      },
      // get in this month and year
      {
        $match: {
          month: month,
          year: year,
        },
      },
      //group by date
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          },
          total: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          total: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    res.status(200).json({ status: "success", usage: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get orders" });
    next();
  }
};

//ward drug usage chart
export const wardDrugUsageChart = async (req, res, next) => {
  const { ward, month, year, drug } = req.body;

  try {
    const wardUsage = await WardDrugUsage.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(ward),
        },
      },
      {
        $project: {
          _id: 0,
          drug: 1,
          quantitytoBHT: 1,
          date: 1,
        },
      },
      {
        $match: {
          drug: mongoose.Types.ObjectId(drug),
        },
      },
      //get in this month and year
      {
        $project: {
          quantity: "$quantitytoBHT",
          date: 1,
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
      },
      {
        $match: {
          month: month,
          year: year,
        },
      },
    ]);
    res.status(200).json({ status: "success", usage: wardUsage });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get ward usage" });
    next();
  }
};

// total drugs usage chart

export const pharmacyTotalDrugUsageChart = async (req, res, next) => {
  const { pharmacist, month, year } = req.body;

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          pharmacist: mongoose.Types.ObjectId(pharmacist),
        },
      },
      {
        $unwind: "$orderItems",
      },
      //get accepted or delivered orders
      {
        $match: {
          $or: [{ status: "DELIVERED" }, { status: "ACCEPTED" }],
        },
      },
      {
        $project: {
          _id: 1,
          orderItems: 1,
          date: 1,
          updatedAt: 1,
          status: 1,
        },
      },
      {
        $project: {
          quantity: "$orderItems.totalIssued",
          date: 1,
          updatedAt: 1,
          _id: 1,
        },
      },
      //  // get in this month and year
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$updatedAt" }, month],
            $eq: [{ $year: "$updatedAt" }, year],
          },
        },
      },
      //group by date
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
          },
          total: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          total: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    res.status(200).json({ status: "success", usage: orders });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot get orders" });
    next();
  }
};
