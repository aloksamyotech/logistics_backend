import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const quotesDetailsSchema = new Schema({
  ...BaseSchema.obj,
  quoteId: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  ETA: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  advance: {
    type: Number,
    required: true,
  },
});

const QuoteDetailsModel = mongoose.model("quotesdetail", quotesDetailsSchema);
export default QuoteDetailsModel;
