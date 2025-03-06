const FamilyGroceriesServices = require("../../services/FamilyGroceriesServices");

class FamilyGroceriesController {
  static get = async (req, res) => {
    const result = await FamilyGroceriesServices.getFamilyGroceries(req, res);
    res.json(result);
  };
  static create = async (req, res) => {
    const result = await FamilyGroceriesServices.createFamilyGroceries(
      req,
      res
    );
    res.json(result);
  };
  static update = async (req, res) => {
    const result = await FamilyGroceriesServices.updateFamilyGroceries(
      req,
      res
    );
    res.json(result);
  };
  static delete = async (req, res) => {
    const result = await FamilyGroceriesServices.deleteFamilyGroceries(
      req,
      res
    );
    res.json(result);
  };
}

module.exports = FamilyGroceriesController;
