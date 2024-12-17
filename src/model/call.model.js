import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const callSchema = new Schema({
  ...BaseSchema.obj,
  duration: { type: String, required: true },
  feedback: { type: String, required: true },
  customerId: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
});

const CallModel = mongoose.model("call", callSchema);
export default CallModel;
