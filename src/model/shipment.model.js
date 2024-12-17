import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const shipmentSchema = new Schema({
  ...BaseSchema.obj,
  shipmentdate: {
    type: Date,
    required: true,
  },
  expectedDeliveryDate: {
    type: Date,
    required: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  receiverId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },

  package_contact_person_name: {
    type: String,
    required: true,
  },

  package_contact_person_phone: {
    type: Number,
    required: true,
  },

  package_transaction_type: {
    type: String,
    required: true,
    enum: ["FullLoad", "PartLoad"],
    default: "FullLoad",
  },

  package_pickup_address: {
    type: String,
    required: true,
  },

  transport_driver_name: {
    type: String,
    required: true,
  },

  transport_driver_phone: {
    type: Number,
    required: true,
  },

  transport_driver_vehicledetails: {
    type: String,
    required: true,
  },

  usernote: {
    type: String,
    required: true,
  },

  charge_transportation: {
    type: Number,
    required: true,
  },

  charge_handling: {
    type: Number,
    required: true,
  },

  charge_halting: {
    type: Number,
    required: true,
  },

  charge_cartage: {
    type: Number,
    required: true,
  },

  charge_over_weight: {
    type: Number,
    required: true,
  },

  charge_insurance: {
    type: Number,
    required: true,
  },

  charge_odc: {
    type: Number,
    required: true,
  },

  charge_tax_percent: {
    type: Number,
    required: true,
  },

  charge_advance_paid: {
    type: Number,
    required: true,
  },

  discount: {
    type: Number,
    required: true,
  },

  total_tax: {
    type: Number,
    required: true,
  },

  total_amount: {
    type: Number,
    required: true,
  },

  total_balance: {
    type: Number,
    required: true,
  },

  remarks: {
    type: String,
    required: true,
  },

  bill_to: {
    type: String,
    required: true,
  },

  bill_to_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
});

const ShipmentModel = mongoose.model("shipment", shipmentSchema);
export default ShipmentModel;
