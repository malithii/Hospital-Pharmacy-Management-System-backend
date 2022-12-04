import mongoose from "mongoose";

const wardDrugUsageSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      trim: true,
      required: true,
    },
    wardId: {
      type: String,
      required: true,
    },
    drugId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drug",
      required: "true",
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
  },
  { timestamps: true }
);

const WardDrugUsage = mongoose.model("warddrugusage", wardDrugUsageSchema);
export default WardDrugUsage;
