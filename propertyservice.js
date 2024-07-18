const Property = require('../models/property');
const Member = require('../models/member');
const PictureService = require('./pictureService');
const Util = require('../util');
const PropertyCategory = require('../entity/type/propertycategory');
const PropertyType = require('../entity/type/propertytype');



// Example usage in a function
function validatePropertyCategory(category) {
  if (category !== PropertyCategory.HOME &&
      category !== PropertyCategory.APARTMENT &&
      category !== PropertyCategory.CONDO &&
      category !== PropertyCategory.TOWNHOUSE) {
    throw new Error('Invalid property category');
  }

  console.log(`Category "${category}" is valid`);
}

// Usage example
validatePropertyCategory('APARTMENT');
validatePropertyCategory('OFFICE'); // Throws an error



// Example usage in a function
function validatePropertyType(type) {
  if (type !== PropertyType.SELL && type !== PropertyType.RENT) {
    throw new Error('Invalid property type');
  }

  console.log(`Property type "${type}" is valid`);
}

// Usage example
validatePropertyType('RENT');
validatePropertyType('LEASE'); // Throws an error


async function findAll(queryParams, principal) {
  const filters = buildFilters(queryParams, principal);
  const properties = await Property.find(filters).populate('pictures').exec();
  return properties;
}

function buildFilters(queryParams, principal) {
  const filters = {};
  if (queryParams.memberId) {
    filters.owner = principal._id; // Assuming principal is the authenticated member
  }
  if (queryParams.search) {
    filters.location = { $regex: new RegExp(queryParams.search, 'i') };
  }
  if (queryParams.minPrice) {
    filters.price = { $gte: queryParams.minPrice };
  }
  if (queryParams.maxPrice) {
    filters.price = { ...filters.price, $lte: queryParams.maxPrice };
  }
  if (queryParams.category) {
    filters.category = queryParams.category;
  }
  if (queryParams.type) {
    filters.type = queryParams.type;
  }
  if (queryParams.numberOfRoom) {
    filters.numberOfRoom = queryParams.numberOfRoom;
  }
  if (queryParams.location) {
    filters.location = queryParams.location;
  }
  return filters;
}

async function findById(id) {
  const property = await Property.findById(id).populate('pictures').exec();
  if (!property) {
    throw new Error('Property not found');
  }
  return property;
}

async function createProperty(propertyRequest, principal) {
  const owner = await Member.findById(principal._id).exec();
  if (!owner || !owner.roles.includes('Owner')) {
    throw new Error('Only owner role is allowed to create a property');
  }

  const property = new Property({
    title: propertyRequest.title,
    price: propertyRequest.price,
    location: propertyRequest.location,
    description: propertyRequest.description,
    category: propertyRequest.category,
    subCategory: propertyRequest.subCategory,
    type: propertyRequest.type,
    numberOfRoom: propertyRequest.numberOfRoom,
    latitude: propertyRequest.latitude,
    longitude: propertyRequest.longitude,
    owner: principal._id
  });

  const savedProperty = await property.save();
  const updatedProperty = await PictureService.updateByProperty(savedProperty._id, propertyRequest.pictures);
  return updatedProperty;
}

async function updateProperty(id, propertyRequest, principal) {
  const property = await Property.findById(id).exec();
  if (!property || property.owner.toString() !== principal._id.toString()) {
    throw new Error('Invalid Property\'s Owner');
  }

  property.set({
    title: propertyRequest.title,
    price: propertyRequest.price,
    location: propertyRequest.location,
    description: propertyRequest.description,
    category: propertyRequest.category,
    subCategory: propertyRequest.subCategory,
    type: propertyRequest.type,
    numberOfRoom: propertyRequest.numberOfRoom,
    latitude: propertyRequest.latitude,
    longitude: propertyRequest.longitude
  });

  const updatedProperty = await PictureService.updateByProperty(property._id, propertyRequest.pictures);
  await property.save();
  return updatedProperty;
}

module.exports = {
  findAll,
  findById,
  createProperty,
  updateProperty
};
