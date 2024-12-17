import mongoose from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";
import { Schema } from "mongoose";

const userSchema = new Schema({
  ...BaseSchema.obj,
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  companyname: { type: String,default: null },
  gstno: { type: Number, default: null },
  phoneno: { type: Number, required: true },
  address: { type: String, default: null },
  usernote: { type: String,  },
  showrates: { type: Number, default: 0 },
  status: { type: Number, default: 1 },
  role: { type: String, required: true, default: "Customer" },
});

const UserModel = mongoose.model("user", userSchema);
export default UserModel;
