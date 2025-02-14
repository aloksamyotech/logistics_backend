import mongoose from "mongoose";
import QuoteModel from "../model/quotes.model.js";
import QuoteDetailsModel from "../model/quotesDetails.model.js";
import { getCoordinates } from "../controller/calculation.js";
import { getRouteDistance } from "../controller/distance.calculator.js";
import { PriceServices } from "./price.service.js";
const Priceservies = new PriceServices();
export class QuotesServices {
  async addQuote(req) {
    try {
      const { customer, date, remark, created_by } = req?.body;

      const timestamp = Date.now();
      const quotationNo = `GLQ${String(timestamp).slice(-4)}`;
      const addNew = await QuoteModel({
        customer: customer,
        date: date,
        remarks: remark,
        quotationNo: quotationNo,
        created_by: created_by,
      });

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
        totalPrice,
      } = req?.body[0];
      console.log(totalPrice);

      const { distanceInKilometers } = await getRouteDistance(
        from,
        to,
        "driving-car"
      );

      const fromCoordinates = await getCoordinates(from);
      const toCoordinates = await getCoordinates(to);

      const addNewDetails = new QuoteDetailsModel({
        quoteId,
        from,
        fromLatitude: fromCoordinates.lat,
        fromLongitude: fromCoordinates.lng,
        to,
        toLatitude: toCoordinates.lat,
        toLongitude: toCoordinates.lng,
        description,
        size,
        weight,
        ETA,
        rate,
        advance,
        created_by,
        distance: distanceInKilometers,
        totalPrice,
      });
      return await addNewDetails.save();
    } catch (error) {
      console.error("Error in addQuoteDetails:", error);
      throw error;
    }
  }

  async getAllQuotes(req) {
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
      // console.log("result ============>", result.length);
      const count = result.length;
      console.log(count);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getQuoteDetailsById(req) {
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
      const count = result.length;

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
      const quoteUpdateResult = await QuoteModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );

      const quoteDetailsUpdateResult = await QuoteDetailsModel.updateOne(
        { quoteId: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );

      console.log(
        "quoteDetailsUpdateResult for delete :",
        quoteDetailsUpdateResult
      );

      return {
        quoteUpdateResult,
        quoteDetailsUpdateResult,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getlanlet(req) {
    try {
      const { from, to } = req.params;

      const result = await QuoteDetailsModel.findOne({ from, to });

      return result;
    } catch (error) {
      console.error("Error fetching coordinates:", error.message);
    }
  }

  async getcount(req) {
    try {
      const result = await QuoteDetailsModel.find();
      const count = result.length;
      return count;
    } catch (error) {
      console.error(error);
    }
  }
}
