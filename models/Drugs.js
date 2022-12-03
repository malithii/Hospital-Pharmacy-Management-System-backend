import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
  drugId: {
    type: String,
    required: true,
  },
  drugName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  level: {
    type: String,
  },
  storeTemp: {
    type: String,
  },
});

const Drugs = mongoose.model("drug", drugSchema);
export default Drugs;
