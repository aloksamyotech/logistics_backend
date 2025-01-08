import ShipmentModel from "../model/shipment.model.js";
import ShipmentVendorDetailsModel from "../model/shipmentVendorDetails.model.js";
import ShipmentPackageModel from "../model/packages.model.js";
import ShipmentInsuranceModel from "../model/insurance.model.js";
import mongoose from "mongoose";
import UserModel from "../model/user.model.js";
export class ShipmentServices {
  async addShipment(req) {
    try {
      const {
        shipmentdate,
        expecteddate,
        senderInfo,
        receiverInfo,
        deliveryAddress,

        contactPersonName,
        contactPersonNumber,
        fullLoad,
        pickupAddress,

        driverName,
        driverNumber,
        vehicleDetails,
        userNotes,

        vendor,
        memoNumber,
        commission,
        cash,
        total,
        advance,

        transportation,
        handling,
        halting,
        insurance,
        cartage,
        overweight,
        odcCharges,
        taxPercent,
        advancePaid,
        discount,

        total_tax,
        total_amount,
        total_balance,

        remarks,
        billToOption,
        created_by,
      } = req?.body;

      const addNew = await ShipmentModel({
        shipmentdate: shipmentdate,
        expectedDeliveryDate: expecteddate,
        senderId: senderInfo,
        receiverId: receiverInfo,
        deliveryAddress: deliveryAddress,

        package_contact_person_name: contactPersonName,
        package_contact_person_phone: contactPersonNumber,
        package_transaction_type: fullLoad,
        package_pickup_address: pickupAddress,

        transport_driver_name: driverName,
        transport_driver_phone: driverNumber,
        transport_driver_vehicledetails: vehicleDetails,
        usernote: userNotes,

        charge_transportation: transportation,
        charge_handling: handling,
        charge_halting: halting,
        charge_cartage: cartage,
        charge_over_weight: overweight,
        charge_insurance: insurance,
        charge_odc: odcCharges,
        charge_tax_percent: taxPercent,
        charge_advance_paid: advancePaid,
        discount: discount,

        total_tax: total_tax,
        total_amount: total_amount,
        total_balance: total_balance,

        remarks: remarks,
        bill_to: billToOption,
        bill_to_id: senderInfo,
        created_by: created_by,
      });

      const shipmentVendorDetails = await ShipmentVendorDetailsModel({
        shipmentId: addNew._id,
        vendorId: vendor,
        memoNumber: memoNumber,
        commission: commission,
        cash: cash,
        total: total,
        advance: advance,
        created_by: created_by,
      });

      await shipmentVendorDetails.save();

      const data = await ShipmentPackageModel.find({ shipmentId: addNew._id });

      const data1 = await ShipmentInsuranceModel.find({
        shipmentId: addNew._id,
      });

      if (data.length === 0 && data1.length === 0) {
        await ShipmentPackageModel.updateMany(
          { shipmentId: null },
          { $set: { shipmentId: addNew._id } }
        );

        await ShipmentInsuranceModel.updateMany(
          { shipmentId: null },
          { $set: { shipmentId: addNew._id } }
        );
      }

      await addNew.save();

      return addNew;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async addShipmentPackages(req) {
    try {
      const {
        description,
        invoiceNumber,
        size,
        weight,
        quantity,
        declaredValue,
        created_by,
        shipmentIdentifier,
      } = req?.body;

      const shipment = await ShipmentModel.findOne({
        identifier: shipmentIdentifier,
      });

      if (!shipment) {
        throw new Error("Shipment not found for the provided identifier.");
      }

      const shipmentId = shipment._id;

      const addNew = new ShipmentPackageModel({
        description,
        invoiceNumber,
        size,
        weight,
        quantity,
        value: declaredValue,
        created_by,
        shipmentId,
      });

      return await addNew.save();
    } catch (error) {
      console.error("Error adding shipment package:", error);
      throw error;
    }
  }

  async updateShipmentPackage(req) {
    try {
      const result = await ShipmentPackageModel.updateOne(
        {
          _id: req.params.id,
        },

        {
          $set: {
            description: req.body.description,
            invoiceNumber: req.body.invoiceNumber,
            size: req.body.size,
            weight: req.body.weight,
            quantity: req.body.quantity,
            value: req.body.declaredValue,
          },
        }
      );
      return result;
    } catch (error) {
      console.error("ddsf", error);
      throw error;
    }
  }

  async addShipmentInsurance(req) {
    try {
      const {
        ewayBill,
        insuranceNo,
        insuranceAgent,
        created_by,
        shipmentIdentifier,
      } = req?.body;

      const shipment = await ShipmentModel.findOne({
        identifier: shipmentIdentifier,
      });

      if (!shipment) {
        throw new Error("Shipment not found for the provided identifier.");
      }

      const shipmentId = shipment._id;

      const addNew = new ShipmentInsuranceModel({
        eway_bill: ewayBill,
        insurance_no: insuranceNo,
        insurance_agent: insuranceAgent,
        shipmentId,
        created_by,
      });

      return await addNew.save();
    } catch (error) {
      console.error("Error adding shipment insurance:", error);
      throw error;
    }
  }

  async getAllShipmentDetails(req) {
    const { id } = req.params;

    try {
      const result = await ShipmentModel.aggregate([
        {
          $match: {
            created_by: new mongoose.Types.ObjectId(req.params.id),
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "senderId",
            foreignField: "_id",
            as: "customerdata1",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "receiverId",
            foreignField: "_id",
            as: "customerdata2",
          },
        },
        {
          $lookup: {
            from: "shipment_packages",
            localField: "_id",
            foreignField: "shipmentId",
            as: "packagedata",
          },
        },
        {
          $lookup: {
            from: "shipment_insurances",
            localField: "_id",
            foreignField: "shipmentId",
            as: "insurancedata",
          },
        },
        {
          $lookup: {
            from: "shipment_vendor_details",
            localField: "_id",
            foreignField: "shipmentId",
            as: "vendordata",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "vendordata.vendorId",
            foreignField: "_id",
            as: "vendordata_user",
          },
        },
        {
          $project: {
            shipmentdate: 1,
            expectedDeliveryDate: 1,
            deliveryAddress: 1,
            package_pickup_address: 1,
            package_contact_person_name: 1,
            package_contact_person_phone: 1,
            package_transaction_type: 1,
            transport_driver_name: 1,
            transport_driver_phone: 1,
            transport_driver_vehicledetails: 1,
            usernote: 1,
            charge_transportation: 1,
            charge_handling: 1,
            charge_halting: 1,
            charge_cartage: 1,
            charge_over_weight: 1,
            charge_insurance: 1,
            charge_odc: 1,
            charge_tax_percent: 1,
            charge_advance_paid: 1,
            discount: 1,
            total_tax: 1,
            total_amount: 1,
            total_balance: 1,
            remarks: 1,
            bill_to: 1,
            senderId: 1, // Include senderId
            receiverId: 1, // Include receiverId
            sender_name: { $arrayElemAt: ["$customerdata1.name", 0] },
            sender_phone: { $arrayElemAt: ["$customerdata1.phoneno", 0] },
            receiver_name: { $arrayElemAt: ["$customerdata2.name", 0] },
            receiver_phone: { $arrayElemAt: ["$customerdata2.phoneno", 0] },
            packagedata: 1,
            insurancedata: 1,
            vendordata: 1,
            vendor_user: { $arrayElemAt: ["$vendordata_user", 0] },
          },
        },
      ]);
      // const resultt = result.length;
      // console.log("length ", resultt);

      // console.log("result :", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getShipmentAllDetailsById(req) {
    try {
      const result = await ShipmentModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(req.params.id),
            deleted: true,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "senderId",
            foreignField: "_id",
            as: "customerdata1",
          },
        },
        {
          $unwind: "$customerdata1",
        },
        {
          $lookup: {
            from: "users",
            localField: "receiverId",
            foreignField: "_id",
            as: "customerdata2",
          },
        },
        {
          $unwind: "$customerdata2",
        },
        {
          $lookup: {
            from: "shipment_packages",
            localField: "_id",
            foreignField: "shipmentId",
            as: "packagedata",
          },
        },
        {
          $unwind: "$packagedata",
        },
        {
          $lookup: {
            from: "shipment_insurances",
            localField: "_id",
            foreignField: "shipmentId",
            as: "insurancedata",
          },
        },
        {
          $unwind: "$insurancedata",
        },
        {
          $lookup: {
            from: "shipment_vendor_details",
            localField: "_id",
            foreignField: "shipmentId",
            as: "vendordata",
          },
        },
        {
          $unwind: "$vendordata",
        },
        {
          $lookup: {
            from: "users",
            localField: "vendordata.vendorId",
            foreignField: "_id",
            as: "data",
          },
        },
        {
          $unwind: "$data",
        },

        {
          $project: {
            shipmentdate: 1,
            expectedDeliveryDate: 1,
            deliveryAddress: 1,

            package_pickup_address: 1,
            package_contact_person_name: 1,
            package_contact_person_phone: 1,
            package_transaction_type: 1,

            transport_driver_name: 1,
            transport_driver_phone: 1,
            transport_driver_vehicledetails: 1,
            usernote: 1,

            charge_transportation: 1,
            charge_handling: 1,
            charge_halting: 1,
            charge_cartage: 1,
            charge_over_weight: 1,
            charge_insurance: 1,
            charge_odc: 1,
            charge_tax_percent: 1,
            charge_advance_paid: 1,
            discount: 1,

            total_tax: 1,
            total_amount: 1,
            total_balance: 1,

            "customerdata1.name": 1,
            "customerdata2.name": 1,
            "customerdata1.phoneno": 1,
            "customerdata2.phoneno": 1,

            "packagedata.invoiceNumber": 1,
            "packagedata.size": 1,
            "packagedata.weight": 1,
            "packagedata.quantity": 1,
            "packagedata.value": 1,
            "packagedata.description": 1,

            "insurancedata.eway_bill": 1,
            "insurancedata.insurance_no": 1,
            "insurancedata.insurance_agent": 1,

            "vendordata.memoNumber": 1,
            "vendordata.commission": 1,
            "vendordata.cash": 1,
            "vendordata.total": 1,
            "vendordata.advance": 1,

            "data.name": 1,
            "data.phoneno": 1,
          },
        },
      ]);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateShipment(req) {
    try {
      const _id = req.params.id;
      const {
        shipmentdate,
        expecteddate,
        senderId,
        receiverId,
        deliveryAddress,

        contactPersonName,
        contactPersonNumber,
        fullLoad,
        package_pickup_address,
        transport_driver_vehicledetails,

        driverName,
        driverNumber,
        vehicleDetails,
        userNotes,

        vendor,
        memoNumber,
        commission,
        cash,
        total,
        advance,

        transportation,
        handling,
        halting,
        insurance,
        cartage,
        overweight,
        odcCharges,
        taxPercent,
        advancePaid,
        discount,

        total_tax,
        total_amount,
        total_balance,

        remarks,
        billToOption,
        created_by,
      } = req?.body;

      const existingShipment = await ShipmentModel.findById(_id);
      if (!existingShipment) throw new Error("Shipment not found");

      const fieldsToUpdate = {
        shipmentdate,
        expecteddate,
        senderId,
        receiverId,
        deliveryAddress,
        package_contact_person_name: contactPersonName,
        package_contact_person_phone: contactPersonNumber,
        package_transaction_type: fullLoad,
        package_pickup_address: package_pickup_address,
        transport_driver_name: driverName,
        transport_driver_phone: driverNumber,
        transport_driver_vehicledetails: vehicleDetails,
        usernote: userNotes,
        charge_transportation: transportation,
        charge_handling: handling,
        charge_halting: halting,
        charge_cartage: cartage,
        charge_over_weight: overweight,
        charge_insurance: insurance,
        charge_odc: odcCharges,
        charge_tax_percent: taxPercent,
        charge_advance_paid: advancePaid,
        discount,
        total_tax,
        total_amount,
        total_balance,
        remarks,
        bill_to: billToOption,
      };

      // Apply updates to fields
      for (const field in fieldsToUpdate) {
        if (fieldsToUpdate[field])
          existingShipment[field] = fieldsToUpdate[field];
      }

      await existingShipment.save();

      const shipmentVendorDetails = await ShipmentVendorDetailsModel.findOne({
        shipmentId: _id,
      });
      if (shipmentVendorDetails) {
        shipmentVendorDetails.vendorId =
          vendor || shipmentVendorDetails.vendorId;
        shipmentVendorDetails.memoNumber =
          memoNumber || shipmentVendorDetails.memoNumber;
        shipmentVendorDetails.commission =
          commission || shipmentVendorDetails.commission;
        shipmentVendorDetails.cash = cash || shipmentVendorDetails.cash;
        shipmentVendorDetails.total = total || shipmentVendorDetails.total;
        shipmentVendorDetails.advance =
          advance || shipmentVendorDetails.advance;

        await shipmentVendorDetails.save();
      }

      return {
        message: "Shipment updated successfully",
        shipment: existingShipment,
      };
    } catch (error) {
      throw new Error("An error occurred while updating the shipment");
    }
  }
  async sendername(req, res) {
    try {
      const result = await UserModel.find({ role: "Customer" });

      return result;
    } catch (error) {
      console.error("Error fetching sender names:", error);
      throw error;
    }
  }
  async deleteshipment(req) {
    try {
      const shipmentUpdateResult = await ShipmentModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );

      return shipmentUpdateResult;
    } catch {
      console.log("errorr comes ", error);
      throw error;
    }
  }
  async totalshipment(req, res) {
    try {
      const result = await ShipmentModel.find();
      const total = result?.length || 0;
      return total;
    } catch (error) {
      console.error("Error fetching shipments:", error);
      throw error;
    }
  }
}
