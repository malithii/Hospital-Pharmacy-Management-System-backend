import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  supplierId: {
    type: String,
    required: true,
  },
  supplierName: {
    type: String,
    required: true,
  },
  supplierAddress: {
    type: String,
  },
  supplierContact: {
    type: Number,
  },
});

const Supplier = mongoose.model("supplier", supplierSchema);
export default Supplier;
