import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const priceSchema = new Schema({
  ...BaseSchema.obj,
  min_weight: { type: Number, required: true },
  max_weight: { type: Number, required: true },

  price: { type: Number, required: true },
});

const weightPriceModel = mongoose.model("weightprice", priceSchema);
export default weightPriceModel;
