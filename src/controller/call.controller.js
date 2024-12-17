import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { CallServices } from "../service/call.service.js";

const callservices = new CallServices();

export class CallController {
  async addCall(req, res) {
    try {
      const result = await callservices.addCall(req);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllCalls(req, res) {
    try {
      const result = await callservices.getAllCalls(req);

      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateCall(req, res) {
    try {
      const result = await callservices.updateCall(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async deleteCall(req, res) {
    try {
      const result = await callservices.deleteCall(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
