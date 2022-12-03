import mongoose from "mongoose";

const wardUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requied: true,
  },
  wardNo: {
    type: String,
    required: true,
  },
  wardContact: {
    type: Number,
    required: true,
  },
  wardEmail: {
    type: String,
    required: true,
  },
});

const WardUser = mongoose.model("wardUser", wardUserSchema);
export default WardUser;
