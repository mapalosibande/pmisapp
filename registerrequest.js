const Joi = require('joi');

const registerRequestSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().required(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').required() // Adjust based on your MemberStatus enum
});

module.exports = { registerRequestSchema };
