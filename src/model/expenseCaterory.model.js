import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const expenseCategorySchema = new Schema({
  ...BaseSchema.obj,
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const ExpenseCategoryModel = mongoose.model("expensecategory", expenseCategorySchema);
export default ExpenseCategoryModel;
