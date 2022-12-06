import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    drugName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // isConfiremed: {
    //   type: boolean,
    // },
    // quantityIssue: {
    //   type: Number,
    // },
    // quantityRecieved: {
    //   type: Number,
    // },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
