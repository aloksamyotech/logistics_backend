import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const quotesDetailsSchema = new Schema({
  ...BaseSchema.obj,
  from: {
    type: String,
    required: true,
  },
  fromLatitude: {
    type: Number,
    required: true,
  },
  fromLongitude: {
    type: Number,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  toLatitude: {
    type: Number,
    required: true,
  },
  toLongitude: {
    type: Number,
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
  created_by: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  quoteId: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  distance: {
    type: Number,
    required: true,
  },

  totalPrice: { type: Number, required: true },
});

const QuoteDetailsModel = mongoose.model("quotesdetail", quotesDetailsSchema);
export default QuoteDetailsModel;
