import mongoose from "mongoose";
import QuoteModel from "../model/quotes.model.js";
import QuoteDetailsModel from "../model/quotesDetails.model.js";

export class QuotesServices {
  async addQuote(req) {
    try {
      const { customer, date, remark, created_by } = req?.body;

      const timestamp = Date.now();
      const quotationNo = `GLQ${String(timestamp).slice(-4)}`;
      console.log("timestamp ========>", timestamp);
      console.log("quotationNo ========>", quotationNo);

      const addNew = await QuoteModel({
        customer: customer,
        date: date,
        remarks: remark,
        quotationNo: quotationNo,
        created_by: created_by,
      });
      console.log("this is ======> addNew ==========>", addNew);
      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addQuoteDetails(req) {
    try {
      const {
        from,
        to,
        description,
        size,
        weight,
        ETA,
        rate,
        advance,
        created_by,
        quoteId,
      } = req?.body;
      console.log("req?.body ===>", req?.body[0]);

      const addNewDetails = await QuoteDetailsModel({
        quoteId: req?.body[0].quoteId,
        from: req?.body[0].from,
        to: req?.body[0].to,
        description: req?.body[0].description,
        size: req?.body[0].size,
        weight: req?.body[0].weight,
        ETA: req?.body[0].ETA,
        rate: req?.body[0].rate,
        advance: req?.body[0].advance,
        created_by: req?.body[0].created_by,
      });
      console.log("addNewDetails ==========>", addNewDetails);

      return await addNewDetails.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllQuotes(req) {
    console.log("id ==>", req.params.id);

    try {
      const result = await QuoteModel.aggregate([
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(req.params.id),
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "customer",
            foreignField: "_id",
            as: "customerdata",
          },
        },
        {
          $unwind: "$customerdata",
        },
        {
          $lookup: {
            from: "quotesdetails",
            localField: "_id",
            foreignField: "quoteId",
            as: "quotedata",
          },
        },
        {
          $unwind: "$quotedata",
        },
        {
          $project: {
            status: 1,
            quotationNo: 1,
            date: 1,
            remarks: 1,
            customer: 1,
            "customerdata.name": 1,
            "quotedata.from": 1,
            "quotedata.to": 1,
            "quotedata.description": 1,
            "quotedata.size": 1,
            "quotedata.weight": 1,
            "quotedata.ETA": 1,
            "quotedata.rate": 1,
            "quotedata.advance": 1,
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

  async getQuoteDetailsById(req) {
    console.log("id ==>", req.params.id);
    try {
      const result = await QuoteModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "customer",
            foreignField: "_id",
            as: "customerdata",
          },
        },
        {
          $unwind: "$customerdata",
        },
        {
          $lookup: {
            from: "quotesdetails",
            localField: "_id",
            foreignField: "quoteId",
            as: "quotedata",
          },
        },
        {
          $unwind: "$quotedata",
        },
        {
          $project: {
            status: 1,
            quotationNo: 1,
            date: 1,
            remarks: 1,
            "customerdata.name": 1,
            "quotedata.from": 1,
            "quotedata.to": 1,
            "quotedata.description": 1,
            "quotedata.size": 1,
            "quotedata.weight": 1,
            "quotedata.ETA": 1,
            "quotedata.rate": 1,
            "quotedata.advance": 1,
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

  async updateQuoteById(req) {
    try {
      const {
        ETA,
        advance,
        customer,
        date,
        description,
        from,
        to,
        rate,
        remark,
        size,
        weight,
      } = req.body;

      console.log("id ==>", req.params.id);
      console.log("req.body ==>", req.body);

      let quoteUpdateResult = null;
      let quoteDetailsUpdateResult = null;

      quoteUpdateResult = await QuoteModel.updateOne(
        {
          _id: req.params.id,
        },
        {
          $set: {
            customer: customer,
            date: date,
            remarks: remark,
          },
        }
      );

      console.log("quoteUpdateResult : ", quoteUpdateResult);

      quoteDetailsUpdateResult = await QuoteDetailsModel.updateOne(
        {
          quoteId: new mongoose.Types.ObjectId(req.params.id),
        },
        {
          $set: {
            from: from,
            to: to,
            description: description,
            size: size,
            weight: weight,
            ETA: ETA,
            rate: rate,
            advance: advance,
          },
        }
      );
      console.log("quoteDetailsUpdateResult : ", quoteDetailsUpdateResult);
      return {
        quoteUpdateResult,
        quoteDetailsUpdateResult,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteQuoteById(req) {
    try {
      console.log("req.params.id :",req.params.id);
      
      const quoteUpdateResult = await QuoteModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );

      console.log("quoteUpdateResult for delete :", quoteUpdateResult);

      const quoteDetailsUpdateResult = await QuoteDetailsModel.updateOne(
        { quoteId: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );

      console.log("quoteDetailsUpdateResult for delete :", quoteDetailsUpdateResult);

      return {
        quoteUpdateResult,
        quoteDetailsUpdateResult,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
