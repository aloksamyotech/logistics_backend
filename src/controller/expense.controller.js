import { sendResponse } from "../core/common/response.handler.js";
import { responseCode } from "../core/constant/response.code.js";
import { ExpenseServices } from "../service/expense.service.js";

const expenseservices = new ExpenseServices();

export class ExpenseController {
  async addExpenseCategory(req, res) {
    try {
      const result = await expenseservices.addExpenseCategory(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async addExpense(req, res) {
    try {
      const result = await expenseservices.addExpense(req);
      return sendResponse(res, responseCode.CREATED, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllExpenses(req, res) {
    try {
      const result = await expenseservices.getAllExpenses(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getAllExpensesCategory(req, res) {
    try {
      const result = await expenseservices.getAllExpensesCategory(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async getOneExpenseData(req, res) {
    try {
      const result = await expenseservices.getOneExpenseData(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateExpenseData(req, res) {
    try {
      const result = await expenseservices.updateExpenseData(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async updateExpenseCategoryData(req, res) {
    try {
      const result = await expenseservices.updateExpenseCategoryData(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }

  async deleteExpenseData(req, res) {
    try {
      const result = await expenseservices.deleteExpenseData(req);
      return sendResponse(res, responseCode.OK, result);
    } catch (error) {
      return sendResponse(res, responseCode.INTERNAL_SERVER_ERROR, null, error);
    }
  }
}
