import mongoose from "mongoose";

const wardDrugUsageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Date,
    },
    drugName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drug",
    },
    batchNo: {
      type: String,
    },
    bht: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },

  { timestamps: true }
);

const WardDrugUsage = mongoose.model("warddrugusage", wardDrugUsageSchema);
export default WardDrugUsage;
