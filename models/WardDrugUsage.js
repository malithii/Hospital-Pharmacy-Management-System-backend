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
    drug: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drug",
    },
    batchNo: {
      type: String,
    },
    bht: {
      type: Number,
    },
    quantitytoBHT: {
      type: Number,
    },
    quantityfromBHT: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

const WardDrugUsage = mongoose.model("warddrugusage", wardDrugUsageSchema);
export default WardDrugUsage;
