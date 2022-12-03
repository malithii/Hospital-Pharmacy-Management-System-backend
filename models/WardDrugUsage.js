import mongoose from "mongoose";

const wardDrugUsageSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  wardId: {
    type: String,
    required: true,
  },
  drugId: {
    type: String,
    required: true,
  },
  batchNo: {
    type: String,
    required: true,
  },
  bhtNo: {
    type: Number,
  },
  amount: {
    type: Number,
  },
});

const WardDrugUsage = mongoose.model("wardDrugUsage", wardDrugUsageSchema);
export default WardDrugUsage;
