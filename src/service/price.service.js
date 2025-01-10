import PriceModel from "../model/price.model.js";
import weightPriceModel from "../model/weight.model.js";

export class PriceServices {
  async addPrice(req) {
    try {
      const { from, to, lcv, openTruck, created_by } = req?.body;
      const newPrice = await PriceModel({
        from: from,
        to: to,
        lcvrate: lcv,
        opentruckrate: openTruck,
        created_by: created_by,
      });

      return await newPrice.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllPrices(req) {
    try {
      const result = await PriceModel.find({
        created_by: req.params.id,
        deleted: false,
      });

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePrice(req) {
    try {
      const result = await PriceModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            from: req.body.from,
            to: req.body.to,
            lcvrate: req.body.lcv,
            opentruckrate: req.body.openTruck,
          },
        }
      );

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePrice(req) {
    try {
      const result = await PriceModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { deleted: true },
        }
      );

      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async calculatePrice(req) {
    try {
      const { distance1, weight } = req.body;

      if (!distance1 || !weight) {
        throw new Error("Both distance and weight are required.");
      }

      const distancePrice = await PriceModel.findOne({
        from: { $lte: distance1 },
        to: { $gte: distance1 },
        deleted: false,
      });

      if (!distancePrice) {
        throw new Error("No price found for the given distance.");
      }

      const weightPrice = await weightPriceModel.findOne({
        min_weight: { $lte: weight },
        max_weight: { $gte: weight },
        deleted: false,
      });

      if (!weightPrice) {
        throw new Error("No price found for the given weight.");
      }

      const totalPrice =
        distancePrice.lcvrate + weightPrice.price + distancePrice.opentruckrate;

      return {
        distancePrice: distancePrice.lcvrate,
        weightPrice: weightPrice.price,
        totalPrice: totalPrice,
      };
    } catch (error) {
      console.error("Error calculating price:", error);
      throw error;
    }
  }
}
