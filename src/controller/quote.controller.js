import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { QuotesServices } from "../service/quote.service.js";

const quoteservices = new QuotesServices();

export class QuotesController {
  async addQuote(req, res) {
    try {
      const result = await quoteservices.addQuote(req);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async addQuoteDetails(req, res) {
    try {
      const result = await quoteservices.addQuoteDetails(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllQuotes(req, res) {
    try {
      const result = await quoteservices.getAllQuotes(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getQuoteDetailsById(req, res) {
    try {
      const result = await quoteservices.getQuoteDetailsById(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateQuoteById(req, res) {
    try {
      const result = await quoteservices.updateQuoteById(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async deleteQuoteById(req, res) {
    try {
      const result = await quoteservices.deleteQuoteById(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async getlanlet(req, res) {
    try {
      const result = await quoteservices.getlanlet(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getcount(req, res) {
    try {
      const result = await quoteservices.getcount(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
