import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { PriceServices } from "../service/price.service.js";

const priceservices = new PriceServices();

export class PriceController {
  async add(req, res) {
    try {
      const result = await priceservices.addPrice(req);
      console.log("result====>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllPrices(req, res) {
    try {
      // const result = await priceservices.getAllPrices(req);
      return sendResponse(
        res,
        responseCode.OK,
        await priceservices.getAllPrices(req)
      );
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updatePrice(req, res) {
    try {
      return sendResponse(
        res,
        responseCode.OK,
        await priceservices.updatePrice(req)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePrice(req, res) {
    try {
      const result = await priceservices.deletePrice(req);
      return sendResponse(res, responseCode.OK);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
