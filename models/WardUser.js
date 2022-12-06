import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    unique: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

wardUserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

wardUserSchema.statics.login = async function (username, password) {
  const wardUser = await this.findOne({ username });
  if (wardUser) {
    const auth = await bcrypt.compare(password, wardUser.password);
    if (auth) {
      return wardUser;
    }
    throw Error("incorrect password");
  }
  throw Error("user not found");
};

const WardUser = mongoose.model("warduser", wardUserSchema);
export default WardUser;
