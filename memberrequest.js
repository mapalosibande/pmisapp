const Joi = require('joi');

const memberRequestSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string().optional(),
  address: Joi.string().optional(),
  state: Joi.string().optional(),
  zip: Joi.string().optional(),
  phone: Joi.string().optional(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE', 'SUSPENDED').optional()
});

module.exports = { memberRequestSchema };
