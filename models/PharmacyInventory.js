import mongoose from "mongoose";

const pharmacyInventorySchema = new mongoose.Schema({
  drugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drugs",
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

const PharmacyInventory = mongoose.model(
  "pharmacyinventory",
  pharmacyInventorySchema
);
export default PharmacyInventory;
