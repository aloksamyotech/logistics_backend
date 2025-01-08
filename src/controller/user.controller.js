import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { userServices } from "../service/user.service.js";
import { userValidationSchema } from "../validation/user.validation.js";

const userservices = new userServices();

export class UserController {
  async add(req, res) {
    try {
      const result = await userservices.addUser(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await userservices.getAllUsers(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async done(req, res) {
    try {
      const user = await userservices.done(req);
      return sendResponse(res, responseCode.OK, user);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async loginUser(req, res) {
    try {
      const result = await userservices.loginUser(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateUser(req, res) {
    try {
      const result = await userservices.updateUser(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getUserDataById(req, res) {
    try {
      const result = await userservices.getUserDataById(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async deleteUser(req, res) {
    try {
      const result = await userservices.deleteUser(req);
      return sendResponse(res, responseCode.OK);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
  async countCustomer(req, res) {
    try {
      const result = await userservices.countCustomer(req);
      return sendResponse(res, responseCode.OK);
    } catch (error) {
      console.error(error);
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
