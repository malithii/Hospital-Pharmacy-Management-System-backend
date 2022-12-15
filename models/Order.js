import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    orderItems: [
      {
        drug: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "drugs",
        },
        quantityOrdered: {
          type: Number,
        },
        batch: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "inventory",
        },
        quantityIssued: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
