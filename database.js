// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pmis', 'root', 'mapalo', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
