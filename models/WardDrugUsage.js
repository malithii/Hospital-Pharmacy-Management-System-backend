import mongoose from "mongoose";

const wardDrugUsageSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
    },
    wardNo: {
      type: String,
      // required: true,
    },
    drugName: {
      type: String,
      required: true,
    },
    batchNo: {
      type: String,
      required: true,
    },
    bht: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    //Strength
  },
  { timestamps: true }
);

const WardDrugUsage = mongoose.model("warddrugusage", wardDrugUsageSchema);
export default WardDrugUsage;
