import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
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
      batch: {
        type: String,
      },
      quantityInStock: {
        type: Number,
      },
      reorderLevel: {
        type: Number,
      },
    },
  ],
});

const inventory = mongoose.model("inventory", inventorySchema);
export default inventory;
