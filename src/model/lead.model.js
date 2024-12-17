import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const leadSchema = new Schema({
  ...BaseSchema.obj,
  name: { type: String, require: true },
  email: { type: String, require: true },
  type: { type: String, require: true },
  forecastclose: { type: String, require: true },
  contact: { type: Number, require: true },
  source: { type: String, require: true },
  region: { type: String, require: true },
  country: { type: String, require: true },
  potentialopportunity: { type: Number, require: true },
  chancesale: { type: Number, require: true },
  weightedforecast: { type: Number, require: true },
  query: { type: String, require: true },
  pickuppincode: { type: Number, require: true },
  deliverypincode: { type: Number, require: true },
  consignmentDescription: { type: String, require: true },
  weight: { type: String, require: true },
  dimension: { type: String, require: true },
});

const LeadModel = mongoose.model("lead", leadSchema);
export default LeadModel;
