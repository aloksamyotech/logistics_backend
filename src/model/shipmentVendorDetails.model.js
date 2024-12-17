import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const shipmentVendorDetailsSchema = new Schema({
  ...BaseSchema.obj,
  shipmentId: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
  vendorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
  memoNumber: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  advance: {
    type: Number,
    required: true,
  },
});

const ShipmentVendorDetailsModel = mongoose.model(
  "shipment_vendor_detail",
  shipmentVendorDetailsSchema
);
export default ShipmentVendorDetailsModel;
