import express from "express";
import { UserController } from "../controller/user.controller.js";
import { PriceController } from "../controller/price.controller.js";
import { LeadController } from "../controller/lead.controller.js";
import { ExpenseController } from "../controller/expense.controller.js";
import { CallController } from "../controller/call.controller.js";
import { VendorExpenseController } from "../controller/vendorExpense.controller.js";
import { QuotesController } from "../controller/quote.controller.js";
import { ShipmentController } from "../controller/shipment.controller.js";
import { ShipmentPackagesController } from "../controller/packages.controller.js";
import { calculateDistance } from "../controller/distance.calculator.js";
const user = new UserController();
const price = new PriceController();
const lead = new LeadController();
const expense = new ExpenseController();
const call = new CallController();
const vendorexpense = new VendorExpenseController();
const quote = new QuotesController();
const shipment = new ShipmentController();

const router = express.Router();
router.get("/user/getalluser", user.done);
router.post("/calculate-distance", calculateDistance);
router.post("/user/add", user.add);
router.get("/user/getalluser_byId/:id", user.getAllUsers);
router.patch("/user/updateone/:id", user.updateUser);
router.get("/user/getuser/:id", user.getUserDataById);
router.delete("/user/deteleuser/:id", user.deleteUser);
router.post("/user/login", user.loginUser);

router.post("/price/add", price.add);
router.get("/price/getallprice/:id", price.getAllPrices);
router.patch("/price/updateprice/:id", price.updatePrice);
router.delete("/price/deleteprice/:id", price.deletePrice);

router.post("/lead/add", lead.addLead);
router.get("/lead/getallleads/:id", lead.getAllLeads);
router.get("/lead/getlead/:id", lead.getLeadDataById);
router.patch("/lead/updatelead/:id", lead.updateLead);
router.delete("/lead/deletelead/:id", lead.deleteLead);

router.post("/expense/addcategory", expense.addExpenseCategory);
router.post("/expense/addexpense", expense.addExpense);
router.get("/expense/getallexpense/:id", expense.getAllExpenses);
router.get(
  "/expense/getallexpense_category/:id",
  expense.getAllExpensesCategory
);
router.get("/expense/getoneexpense/:id", expense.getOneExpenseData);
router.patch("/expense/updateexpense/:id", expense.updateExpenseData);
router.patch(
  "/expense/updateexpense_category/:id",
  expense.updateExpenseCategoryData
);
router.delete("/expense/deleteexpense/:id", expense.deleteExpenseData);

router.post("/call/add", call.addCall);
router.get("/call/getallcalls/:id", call.getAllCalls);
router.patch("/call/updatecalls/:id", call.updateCall);
router.delete("/call/deletecall/:id", call.deleteCall);

router.post("/vendor/addexpense", vendorexpense.addVendorExpense);
router.get(
  "/vendor/getallvendor_expense/:id",
  vendorexpense.getAllVendorExpense
);
router.get(
  "/vendor/getvendor_expensedata/:id",
  vendorexpense.getVendorExpenseDataById
);
router.patch(
  "/vendor/update_expensedata/:id",
  vendorexpense.updateVendorExpenseData
);
router.delete(
  "/vendor/delete_expensedata/:id",
  vendorexpense.deleteVendorExpenseData
);

router.post("/quote/add", quote.addQuote);
router.post("/quote/addquotedetails", quote.addQuoteDetails);
router.get("/quote/getallquotes/:id", quote.getAllQuotes);
router.get("/quote/getquotedetails/:id", quote.getQuoteDetailsById);
router.patch("/quote/updatequotedetails/:id", quote.updateQuoteById);
router.delete("/quote/deletequotedetails/:id", quote.deleteQuoteById);

router.post("/shipment/add", shipment.addShipment);
router.post("/shipment/packages/add", shipment.addShipmentPackages);
router.post("/shipment/insurance_add", shipment.addShipmentInsurance);
router.get(
  "/shipment/allshipments_details/:id",
  shipment.getAllShipmentDetails
);
router.get(
  "/shipment/shipments_details/:id",
  shipment.getShipmentAllDetailsById
);
router.patch("/shipment/update_package/:id", shipment.updateShipmentPackage);
router.put("/shipment/update_shipment/:id", shipment.updateshipment);
router.get("/users/customer", shipment.sendername);
router.delete("/shipment_delete/:id", shipment.deleteshipment);

export default router;
