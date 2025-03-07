const Joi = require("joi");

const userSchema = {
  login: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).required(),
  }),

  delete: Joi.object({
    email: Joi.string().email().required(),
  }),

  update: Joi.object({
    user_id: Joi.number().required(),
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required().min(5),
    confirmPassword: Joi.ref("password"),
  }),
  register: Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required().min(5),
    confirmPassword: Joi.ref("password"),
  }),
  validateUser: Joi.object({
    username: Joi.string().required(),
    jwtToken: Joi.string().required(),
  }),

  getUser: Joi.object({
    id: Joi.string().required().messages({
      "string.base": "ID must be a string",
      "any.required": "ID is required in the query parameters",
    }),
  }),
};

module.exports = userSchema;
