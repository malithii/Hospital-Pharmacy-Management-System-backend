import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  drugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drug",
  },
  quantityOrder: {
    type: Number,
    required: true,
  },
  quantityIssue: {
    type: Number,
  },
  quantityRecieved: {
    type: Number,
  },
});

const Order = mongoose.model("order", orderSchema);
export default Order;
