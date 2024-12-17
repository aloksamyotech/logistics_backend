import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const shipmentInsuranceSchema = new Schema({
  ...BaseSchema.obj,
  shipmentId: {
    type: mongoose.Types.ObjectId,
    // required: true,
    default: null,
  },
  eway_bill: { type: String, required: true },
  insurance_no: { type: String, required: true },
  insurance_agent: { type: String, required: true },
});

const ShipmentInsuranceModel = mongoose.model(
  "shipment_insurance",
  shipmentInsuranceSchema
);
export default ShipmentInsuranceModel;
