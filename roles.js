const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configuration/database');


//class Role {}

class Role extends Model { constructor(name) {
  this.name = name;
}}

Role.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles',
  timestamps: true,
  underscored: true
});

module.exports = Role;
