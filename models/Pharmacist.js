import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
});

const Pharmacist = mongoose.model("pharmacist", pharmacistSchema);
export default Pharmacist;
