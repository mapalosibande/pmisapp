// models/index.js
const Sequelize = require('sequelize');
const sequelize = new Sequelize('pmis', 'root', 'mapalo', {
    host: 'localhost',
    dialect: 'mysql',
});
const models = {};


// Initialize models
models.Member = require('./member')(sequelize);
models.Property = require('./property')(sequelize);
models.PasswordResetToken = require('./passwordresettoken')(sequelize);
models.Picture = require('./pictures')(sequelize);
models.Offer = require('./offer')(sequelize); // Ensure Offer model is imported


// Define associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
const init = async () => {
    try {
        await sequelize.sync({ force: true }); // Use { force: true } for development to reset the database on every run
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing the database:', error);
    }
};

init();
module.exports = {
    sequelize,
    ...models
};
