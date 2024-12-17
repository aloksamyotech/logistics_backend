import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { ShipmentPackageServices } from "../service/package.service.js";

const shipmentPackage = new ShipmentPackageServices();

export class ShipmentPackagesController {
  async addPackages(req, res) {
    console.log("err");

    try {
      const result = await shipmentPackage.addPackages(req);
      console.log("result===>", result);

      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
