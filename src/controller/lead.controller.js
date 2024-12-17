import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { LeadServices } from "../service/lead.service.js";

const leadservices = new LeadServices();

export class LeadController {
  async addLead(req, res) {
    try {
      const result = await leadservices.addLead(req);
      console.log("result ===>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllLeads(req, res) {
    try {
      return sendResponse(
        res,
        responseCode.OK,
        await leadservices.getAllLeads(req)
      );
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getLeadDataById(req, res) {
    try {
      const result = await leadservices.getLeadDataById(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateLead(req, res) {
    try {
      const result = await leadservices.updateLead(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async deleteLead(req, res) {
    try {
      const result = await leadservices.deleteLead(req);
      return sendResponse(res, responseCode.OK);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
