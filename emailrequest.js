const Joi = require('joi');

const emailRequestSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  recipient: Joi.string().email().required()
});

module.exports = { emailRequestSchema };
