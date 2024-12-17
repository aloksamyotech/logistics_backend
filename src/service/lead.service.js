import LeadModel from "../model/lead.model.js";

export class LeadServices {
  async addLead(req) {
    try {
      console.log("req.body ==>", req?.body);

      const {
        name,
        email,
        type,
        forecastclose,
        contact,
        source,
        region,
        country,
        potentialopportunity,
        chancesale,
        weightedforecast,
        query,
        pickuppincode,
        deliverypincode,
        consignmentDescription,
        weight,
        dimension,
        created_by,
      } = req?.body;

      const newLead = await LeadModel({
        name: name,
        email: email,
        type: type,
        forecastclose: forecastclose,
        contact: contact,
        source: source,
        region: region,
        country: country,
        potentialopportunity: potentialopportunity,
        chancesale: chancesale,
        weightedforecast: weightedforecast,
        query: query,
        pickuppincode: pickuppincode,
        deliverypincode: deliverypincode,
        consignmentDescription: consignmentDescription,
        weight: weight,
        dimension: dimension,
        created_by: created_by,
      });

      console.log("newLead ====>", newLead);
      return await newLead.save();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllLeads(req) {
    try {
      const result = await LeadModel.find({
        created_by: req.params.id,
        deleted: false,
      });
      console.log("result==>", result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getLeadDataById(req) {
    try {
      console.log("req.params.id ==>", req.params.id);
      const result = await LeadModel.findById({ _id: req.params.id });
      console.log("result ==>", result);
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async updateLead(req) {
    try {
      console.log("req.params.id ==>", req.params.id);

      const result = await LeadModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            type: req.body.email,
            forecastclose: req.body.forecastclose,
            contact: req.body.contact,
            source: req.body.source,
            region: req.body.region,
            country: req.body.country,
            potentialopportunity: req.body.potentialopportunity,
            chancesale: req.body.chancesale,
            weightedforecast: req.body.weightedforecast,
            query: req.body.query,
            pickuppincode: req.body.pickuppincode,
            deliverypincode: req.body.deliverypincode,
            consignmentDescription: req.body.consignmentDescription,
            weight: req.body.weight,
            dimension: req.body.dimension,
          },
        }
      );
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }

  async deleteLead(req) {
    try {
      console.log("req.params.id ==>", req.params.id);

      const result = await LeadModel.updateOne(
        { _id: req.params.id },
        {
          $set: {
            deleted: true,
          },
        }
      );
      return result;
    } catch (error) {
      console.log("Error Found =======>", error);
      throw error;
    }
  }
}
