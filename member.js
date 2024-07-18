const { Sequelize, DataTypes } = require('sequelize');
//const sequelize = new Sequelize(process.env.MYSQL_URI);
const sequelize = new Sequelize('pmis', 'root', 'mapalo', {
  host: 'localhost',
  dialect: 'mysql'/* | 'mariadb' | 'postgres' | 'mssql' */
});
const { Model } = require('sequelize');
//const sequelize = require('../configuration/database');
const Role = require('./roles');
const Property = require('./property');
const Offer = require('./offer');
const MemberStatus = require('../entity/type/memberstatus'); // Assuming you have MemberStatus defined


module.exports = (sequelize) => {
  const Member = sequelize.define('Member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define other attributes as needed
  });

  // Import related models
  const Property = require('./property')(sequelize);
  const Offer = require('./offer')(sequelize);

  // Define associations
  Member.hasMany(Property, { foreignKey: 'member_id', as: 'properties' });
  Member.hasMany(Offer, { foreignKey: 'member_id', as: 'offers' });

  return Member;
};