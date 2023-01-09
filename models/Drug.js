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
  strength: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  storeTemp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "storetemp",
  },
  description: {
    type: String,
  },
});

const Drugs = mongoose.model("drug", drugSchema);
export default Drugs;
