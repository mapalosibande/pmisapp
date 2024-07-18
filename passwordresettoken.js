const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/database');
const Member = require('./member');

const PasswordResetToken = sequelize.define('PasswordResetToken', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Adding a unique constraint
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  memberId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Member,
      key: 'id'
    }
  }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

PasswordResetToken.belongsTo(Member, { as: 'member', foreignKey: 'memberId' });

module.exports = PasswordResetToken;
