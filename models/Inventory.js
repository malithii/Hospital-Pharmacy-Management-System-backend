import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    inventory: [
      {
        drug: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "drug",
          required: true,
        },
        batch: [
          {
            batchNo: {
              type: String,
            },
            expDate: {
              type: Date,
            },
            quantity: {
              type: Number,
            },
          },
        ],

        quantityInStock: {
          type: Number,
        },
        reorderLevel: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Inventory = mongoose.model("inventory", inventorySchema);
export default Inventory;
