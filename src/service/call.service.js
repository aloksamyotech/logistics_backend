import mongoose, { mongo } from "mongoose";
import CallModel from "../model/call.model.js";

export class CallServices {
  async addCall(req) {
    console.log("req.params.id  ===>", req.params.id);

    try {
      const { duration, feedback, customer, created_by } = req?.body;

      const newCall = await CallModel({
        duration: duration,
        feedback: feedback,
        customerId: customer,
        created_by: created_by,
      });
      console.log("newCall ==================>", newCall);
      return await newCall.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllCalls(req) {
    console.log("req.params.id===>", req.params.id);

    try {
      const result = await CallModel.aggregate([
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(req.params.id),
            deleted: false
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "customerId",
            foreignField: "_id",
            as: "customerdata",
          },
        },
        {
          $unwind: "$customerdata",
        },
        {
          $project: {
            duration: 1,
            feedback: 1,
            created_at: 1,
            "customerdata.name": 1,
            "customerdata.companyname": 1,
            "customerdata._id": 1,
            "customerdata.email": 1,
          },
        },
      ]);
      console.log("result ==============>", result);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCall(req) {
    try {
      const result = await CallModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            customerId: req.body.customer,
            duration: req.body.duration,
            feedback: req.body.feedback,
          },
        }
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCall(req) {
    try {
      const result = await CallModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
