import PriceModel from "../model/price.model.js";

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
      console.log("newPrice =====>", newPrice);

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
      console.log("result ==>", result);

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
      console.log("req.params.id ==>", req.params.id);
      const result = await PriceModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: { deleted: true },
        }
      );
      console.log("result ==>", result);
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }
}
