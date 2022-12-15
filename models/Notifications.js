import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: user,
  },
  message: {
    type: String,
  },
  state: {
    type: String,
  },
});

const Notification = mongoose.model("notification", notificationSchema);
export default Notification;
