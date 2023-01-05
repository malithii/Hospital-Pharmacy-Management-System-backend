import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Date,
    },
    status: {
      type: String,
      default: "PENDING",
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

        issueDrugs: [
          {
            batch: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "inventory",
            },
            quantityIssued: {
              type: Number,
              default: 0,
            },
            quantityRecieved: {
              type: Number,
              default: 0,
            },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
