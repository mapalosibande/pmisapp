// models/Picture.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/database');
const Property = require('./property');
const Member = require('./member');


module.exports = (sequelize) => {
const Picture = sequelize.define('Picture', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.STRING,
    propertyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Property,
            key: 'id'
        }
    },
    memberId: {
        type: DataTypes.INTEGER,
        references: {
            model: Member,
            key: 'id'
        }
    }
});

// Define associations inside the function
Picture.associate = (models) => {
    // Example association
    Picture.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
    Picture.belongsTo (models.Member, {
        foreignKey: 'memberId',
        as: 'member',
    });
  };

  return Picture;
};
