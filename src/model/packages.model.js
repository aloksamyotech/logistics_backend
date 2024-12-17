import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const shipmentpackageSchema = new Schema({
  ...BaseSchema.obj,
  shipmentId: {
    type: mongoose.Types.ObjectId,
    // required: true,
    default: null,
  },
  description: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  size: { type: Number, required: true },
  weight: { type: String, required: true },
  quantity: { type: Number, required: true },
  value: { type: Number, required: true },
});

const ShipmentPackageModel = mongoose.model(
  "shipment_package",
  shipmentpackageSchema
);
export default ShipmentPackageModel;
