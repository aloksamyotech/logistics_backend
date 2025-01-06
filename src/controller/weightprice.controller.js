import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";

import { WeightPriceServices } from "../service/weight.js";
const weightPriceServices = new WeightPriceServices();

export class WeightPriceController {
  async add(req, res) {
    try {
      const result = await weightPriceServices.addWeightPrice(req);
      console.log("result====>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      console.error("Error in addWeightPrice:", error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAll(req, res) {
    try {
      const result = await weightPriceServices.getAllWeightPrices(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error("Error in getAllWeightPrices:", error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async update(req, res) {
    try {
      const result = await weightPriceServices.updateWeightPrice(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error("Error in updateWeightPrice:", error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async delete(req, res) {
    try {
      const result = await weightPriceServices.deleteWeightPrice(req);
      return sendResponse(res, responseCode.OK);
    } catch (error) {
      console.error("Error in deleteWeightPrice:", error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
