import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { PriceServices } from "../service/price.service.js";

const priceservices = new PriceServices();

export class PriceController {
  async add(req, res) {
    try {
      const result = await priceservices.addPrice(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllPrices(req, res) {
    try {
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
  async calculatePrice(req, res) {
    try {
      const result = await priceservices.calculatePrice(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
