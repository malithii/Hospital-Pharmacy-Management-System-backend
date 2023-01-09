import mongoose from "mongoose";

const storeTempSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  range: {
    type: String,
  },
});

const StoreTemp = mongoose.model("storetemp", storeTempSchema);
export default StoreTemp;
