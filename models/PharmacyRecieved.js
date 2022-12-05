import mongoose from "mongoose";

const pharmacyRecievedSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    drugName: {
      type: String,
    },
    batchNo: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    Strength: {
      type: String,
    },

    packSize: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    expDate: {
      type: Date,
      required: true,
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PharmacyRecieved = mongoose.model(
  "pharmacyrecieved",
  pharmacyRecievedSchema
);
export default PharmacyRecieved;
