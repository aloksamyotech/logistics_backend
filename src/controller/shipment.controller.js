import { json } from "express";
import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import ShipmentModel from "../model/shipment.model.js";
import { ShipmentServices } from "../service/shipment.service.js";

const shipmentservices = new ShipmentServices();

export class ShipmentController {
  async addShipment(req, res) {
    try {
      const result = await shipmentservices.addShipment(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async addShipmentInsurance(req, res) {
    try {
      const result = await shipmentservices.addShipmentInsurance(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async addShipmentPackages(req, res) {
    try {
      const result = await shipmentservices.addShipmentPackages(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateShipmentPackage(req, res) {
    try {
      const result = await shipmentservices.updateShipmentPackage(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllShipmentDetails(req, res) {
    let { a } = req.params.id;

    try {
      const result = await shipmentservices.getAllShipmentDetails(req);

      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getShipmentAllDetailsById(req, res) {
    try {
      let dd = req.params;
      console.log(dd);

      const result = await shipmentservices.getShipmentAllDetailsById(req);
      console.log(result);

      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateshipment(req, res) {
    try {
      const result = await shipmentservices.updateShipment(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async updateShipmentPackage(req, res) {
    try {
      const result = await shipmentservices.updateShipment(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async sendername(req, res) {
    try {
      const result = await shipmentservices.sendername(req);

      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async deleteshipment(req, res) {
    try {
      const result = await shipmentservices.deleteshipment(req);

      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async totalshipment(req, res) {
    try {
      const result = await shipmentservices.totalshipment(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
