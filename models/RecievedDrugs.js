import mongoose from "mongoose";

const recievedDrugsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    date: {
      type: Date,
    },
    recievedDrugs: [
      {
        drug: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "drug",
        },
        batchNo: {
          type: String,
        },
        expDate: {
          type: Date,
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const RecievedDrugs = mongoose.model("recieveddrugs", recievedDrugsSchema);
export default RecievedDrugs;
