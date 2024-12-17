import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const priceSchema = new Schema({
  ...BaseSchema.obj,
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  lcvrate: { type: Number, required: true },
  opentruckrate: { type: Number, required: true },
});

const PriceModel = mongoose.model("price", priceSchema);
export default PriceModel;
