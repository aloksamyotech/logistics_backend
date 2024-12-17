import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const vendorSchema = new Schema({
  ...BaseSchema.obj,
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  note: { type: String, required: true },
  vendorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
});

const VendorExpenseModel = mongoose.model("vendorexpense", vendorSchema);
export default VendorExpenseModel;
