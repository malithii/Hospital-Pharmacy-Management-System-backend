import mongoose from "mongoose";

const wardInventorySchema = new mongoose.Schema({
  drugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drug",
    required: true,
  },
  batchNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pharmacyrecieved",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const WardInventory = mongoose.model("wardinventory", wardInventorySchema);
export default WardInventory;
