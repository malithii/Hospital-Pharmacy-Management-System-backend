import mongoose from "mongoose";

const pharmacyRecievedSchema = new mongoose.Schema({
  drugId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drug",
  },
  batchNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
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
});

const PharmacyRecieved = mongoose.model(
  "pharmacyrecieved",
  pharmacyRecievedSchema
);
export default PharmacyRecieved;
