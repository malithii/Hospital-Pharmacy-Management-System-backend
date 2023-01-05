import mongoose from "mongoose";

const storeTempSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  range: {
    type: String,
  },
});

const StoreTemp = mongoose.model("storetemp", storeTempSchema);
export default StoreTemp;
