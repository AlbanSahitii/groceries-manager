const Joi = require("joi");

const familySchema = {
  create: Joi.object({
    family_name: Joi.string().required(),
    user_id: Joi.number().required(),
  }),
  get: Joi.object({
    family_id: Joi.string().required().messages({
      "string.base": "ID must be a string",
      "any.required": "ID is required in the query parameters",
    }),
  }),
  updateFamily: Joi.object({
    family_id: Joi.number().required(),
    family_name: Joi.string().required(),
  }),
  delete: Joi.object({
    family_id: Joi.number().required(),
  }),
  getFamilyMembers: Joi.object({
    family_id: Joi.string().required().messages({
      "string.base": "ID must be a string",
      "any.required": "ID is required in the query parameters",
    }),
  }),
  checkUser: Joi.object({
    user_id: Joi.string().required().messages({
      "string.base": "ID must be a string",
      "any.required": "ID is required in the query parameters",
    }),
  }),
  addFamilyMember: Joi.object({
    email: Joi.string().required().email(),
    family_id: Joi.number().required(),
  }),
  acceptInvite: Joi.object({
    user_id: Joi.number().required(),
    family_id: Joi.number().required(),
  }),
  declineInvite: Joi.object({
    user_id: Joi.number().required(),
    family_id: Joi.number().required(),
  }),
  removeFromFamily: Joi.object({
    username: Joi.string().required(),
  }),
  changeOwner: Joi.object({
    ownerUsername: Joi.string().required(),
    newOwnerUsername: Joi.string().required(),
  }),
  getInviteInformaiton: Joi.object({
    user_id: Joi.number().required(),
    family_id: Joi.number().required(),
  }),
};
module.exports = familySchema;
