import mongoose from "mongoose";
import VendorExpenseModel from "../model/vendorExpense.model.js";

export class VendorExpenseServices {
  async addVendorExpense(req) {
    try {
      console.log("req?.body ====>", req?.body);

      const { name, amount, note, vendorId, created_by } = req?.body;

      const addNew = await VendorExpenseModel({
        name: name,
        amount: amount,
        note: note,
        vendorId: new mongoose.Types.ObjectId(vendorId),
        created_by: created_by,
      });
      console.log("addNew ==========>", addNew);

      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllVendorExpense(req) {
    try {
      const result = await VendorExpenseModel.aggregate([
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(req.params.id),
            deleted: false
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendordata",
          },
        },
        {
          $unwind: "$vendordata",
        },
        {
          $project: {
            name: 1,
            amount: 1,
            note: 1,
            created_at: 1,
            "vendordata.name": 1,
            "vendordata._id": 1,
          },
        },
      ]);
      console.log("result ============>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getVendorExpenseDataById(req) {
    try {
      const result = await VendorExpenseModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "vendorId",
            foreignField: "_id",
            as: "vendordata",
          },
        },
        {
          $unwind: "$vendordata",
        },
        {
          $project: {
            name: 1,
            amount: 1,
            note: 1,
            created_at: 1,
            "vendordata.name": 1,
            "vendordata.phoneno": 1,
            "vendordata.email": 1,
          },
        },
      ]);
      console.log("result ============>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateVendorExpenseData(req) {
    try {
      const result = await VendorExpenseModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            vendorId: req.body.vendorId,
            name: req.body.name,
            amount: req.body.amount,
            note: req.body.note,
          },
        }
      );
      console.log("result ============>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteVendorExpenseData(req) {
    try {
      const result = await VendorExpenseModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );
      console.log("result ============>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
