import ShipmentPackageModel from "../model/packages.model.js";

export class ShipmentPackageServices {
  async addPackages(req) {
    try {
      const { description, invoiceNumber, size, weight, quantity, value } =
        req?.body;
      let { pack } = req.params.id;

      const addNew = await ShipmentPackageModel({
        description: description,
        invoiceNumber: invoiceNumber,
        size: size,
        weight: weight,
        quantity: quantity,
        value: value,
      });

      return await addNew.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editPackages(req) {
    try {
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
