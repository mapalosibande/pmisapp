const Joi = require('joi');

const propertyRequestSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  location: Joi.string().required(),
  description: Joi.string().optional(),
  pictures: Joi.array().items(Joi.string().uri()).optional(),
  category: Joi.string().optional(),
  subCategory: Joi.string().optional(),
  type: Joi.string().optional(),
  offerStatus: Joi.string().optional(),
  status: Joi.string().optional(),
  numberOfRoom: Joi.number().integer().optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional()
});

module.exports = { propertyRequestSchema };
