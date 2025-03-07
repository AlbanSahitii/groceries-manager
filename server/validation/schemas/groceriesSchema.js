const Joi = require("joi");

const groceriesSchema = {
  create: Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.number().required(),
    unit: Joi.string().required(),
  }),
  get: Joi.object({
    name: Joi.string().required().messages({
      "string.base": "name must be a string",
      "any.required": "name is required in the query parameters",
    }),
  }),
  update: Joi.object({
    grocerieId: Joi.number().required(),
    name: Joi.string().required(),
    categoryId: Joi.number().required(),
    unit: Joi.string().required(),
  }),
  delete: Joi.object({
    id: Joi.number().required(),
  }),
  addGrocerieInList: Joi.object({
    user_id: Joi.number().required(),
    family_id: Joi.number().required(),
    groceries_id: Joi.number().required(),
  }),
  getFamilyGroceryList: Joi.object({
    family_id: Joi.string().required().messages({
      "string.base": "family_id must be a string",
      "any.required": "family_id is required in the query parameters",
    }),
  }),
  purchaseGrocery: Joi.object({
    family_groceries_id: Joi.number().required(),
  }),
  getLastTenGroceries: Joi.object({
    family_id: Joi.number().required(),
  }),
};

module.exports = groceriesSchema;
