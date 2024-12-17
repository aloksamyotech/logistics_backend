import mongoose from "mongoose";
import { Schema } from "mongoose";
import { BaseSchema } from "../core/schema/base.schema.js";

const expenseSchema = new Schema({
  ...BaseSchema.obj,
  name: { type: String, required: true },
  note: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  expense_categoryId: {
    type: mongoose.Types.ObjectId,
    required: true,
    default: null,
  },
});

const ExpenseModel = mongoose.model("expense", expenseSchema);
export default ExpenseModel;
