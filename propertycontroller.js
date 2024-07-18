const propertyService = require('../services/propertyservice');
const PropertyRequest = require('../controllers/request/propertyrequest');
const PropertyResponse = require('../controllers/response/propertyresponse');
const PageResponse = require('../controllers/response/pageresponse');
const Util = require('../util');

exports.findAllProps = (req, res) => {
  const {
    memberId,
    search,
    minPrice,
    maxPrice,
    category,
    type,
    numberOfRoom,
    location
  } = req.query;

  const props = propertyService.findAll(
    memberId,
    search,
    minPrice,
    maxPrice,
    category,
    type,
    numberOfRoom,
    location,
    req.query
  );

  res.json(new PageResponse(props, PropertyResponse));
};

exports.findById = (req, res) => {
  const prop = propertyService.findById(req.params.id);
  res.json(Util.mapObj(prop, PropertyResponse));
};

exports.createProperty = (req, res) => {
  const createdProperty = propertyService.createProperty(req.body, req.user);
  res.json(Util.mapObj(createdProperty, PropertyResponse));
};

exports.updateProperty = (req, res) => {
  const updatedProperty = propertyService.updateProperty(req.params.id, req.body, req.user);
  res.json(Util.mapObj(updatedProperty, PropertyResponse));
};
