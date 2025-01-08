import weightPriceModel from "../model/weight.model.js";

export class WeightPriceServices {
  async addWeightPrice(req) {
    try {
      const { min_weight, max_weight, price, created_by } = req?.body;

      const newWeightPrice = new weightPriceModel({
        min_weight,
        max_weight,
        price,
        created_by,
      });

      return await newWeightPrice.save();
    } catch (error) {
      console.error("Error in addWeightPrice:", error);
      throw error;
    }
  }

  async getAllWeightPrices(req) {
    try {
      const result = await weightPriceModel.find({
        created_by: req.params.id,
        deleted: false,
      });

      return result;
    } catch (error) {
      console.error("Error in getAllWeightPrices:", error);
      throw error;
    }
  }

  async updateWeightPrice(req) {
    try {
      const { min_weight, max_weight, price } = req.body;

      const result = await weightPriceModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            min_weight,
            max_weight,
            price,
          },
        }
      );

      return result;
    } catch (error) {
      console.error("Error in updateWeightPrice:", error);
      throw error;
    }
  }

  async deleteWeightPrice(req) {
    try {
      const result = await weightPriceModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { deleted: true },
        }
      );

      return result;
    } catch (error) {
      console.error("Error in deleteWeightPrice:", error);
      throw error;
    }
  }
}
