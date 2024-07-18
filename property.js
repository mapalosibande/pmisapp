const { Model, Op } = require('sequelize');
const sequelize = require('../configuration/database');
const Member = require('./member');
const Picture = require ('./pictures');
const Offer = require('./offer')(sequelize);
//const PropertyStatus = require('../entity/type/propertystatus'); // Assuming you have PropertyStatus defined

const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define other attributes as needed
  });

  // Import related models
  const Picture = require('./pictures')(sequelize);
  const Offer = require('./offer')(sequelize);

  // Define associations
  Property.hasMany(Picture, { foreignKey: 'property_id', as: 'pictures' });
  Property.hasMany(Offer, { foreignKey: 'property_id', as: 'offers' });

  return Property;
};
