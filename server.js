const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/models');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());
// Middleware
app.use(bodyParser.json());

// Routes
app.use ('/api', authRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
