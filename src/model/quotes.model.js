import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const quoteSchema = new Schema({
  ...BaseSchema.obj,
  customer: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
  date: {
    type: Date,
    required: true,
  },
  remarks: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  quotationNo: {
    type: String,
    unique: true,
  },
});

const QuoteModel = mongoose.model("quote", quoteSchema);
export default QuoteModel;
