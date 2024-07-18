const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const cors = require('cors');
const apiRoutes = require('./routes/api');
const { authenticateJWT } = require('./middleware/auth');
const emailRoutes = require('./routes/email');
const memberRoutes = require('./routes/member');
const propertyRoutes = require('./routes/property');
const registerRoutes = require('./routes/register');
const pageRoutes = require('./routes/page');
const adminRoutes = require('./routes/adminroutes');
const indexRouter = require('./routes/index');

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mapalo',
  database: 'pmis',
});

db.connect((err) => {
  if (err) {
    console.error ('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.json('LETS GOO, Property Management System!or send help');
});


// Get all users
app.get('/member', (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a user by ID
app.get('/member/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Create a new user
app.post('/members', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INTO members (name, email) VALUES (?, ?)', [name, email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'member added successfully', id: result.insertId });
  });
});

// Update a user
app.put ('/members/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  db.query('UPDATE members SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
    if (err) throw err;
    res.json({ message: 'member updated successfully'});
  });
});

// Delete a user
app.delete('/members/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM members WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'member deleted successfully' });
  });
});


app.use('/api/v1/auth', apiRoutes.auth);
app.use('/api/v1/properties', apiRoutes.properties);
app.use('/api/v1/files', apiRoutes.files);

// JWT Authentication middleware for protected routes
app.use('/api/v1/admins', authenticateJWT, apiRoutes.admins);
app.use('/api/v1/owners', authenticateJWT, apiRoutes.owners);
app.use('/api/v1/customers', authenticateJWT, apiRoutes.customers);

app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1', registerRoutes);
app.use('/api/v1', pageRoutes);
app.use('/api/v1/admins', adminRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/emails', emailRoutes);
app.use('/api/v1/users', memberRoutes);
















































































































































































//import authRoutes from './routes/auth';
//import yourRoutes from './routes/yourRoutes';
//const propertyRoutes = require('./routes/propertiesRoutes1');
//const leaseRoutes = require('./routes/leasesRoutes1');
//const transactionRoutes = require('./routes/financialTransactionsRoutes1');
//const maintenanceRequestRoutes = require('./routes/maintenanceRequestsRoutes1');
//import { mysql as _mysql, mongoURI } from './config';
//import { connect, connection } from 'mongoose';
//import { initialize } from 'passport';
//import maintenanceRequestsRoutes1 from './routes/maintenanceRequestsRoutes1';
//import propertiesRoutes1 from './routes/propertiesRoutes1';
//import leasesRoutes1 from './routes/leasesRoutes1';
//import tenantsRoutes1 from './routes/tenantsRoutes1';
//import financialTransactionsRoutes1 from './routes/financialTransactionsRoutes1';




//app.use(express.json());  // Use express.json middleware only once

// Create MySQL connection pool
//const pool = createPool(mysql);

// Routes
//app.use('/yourpath', yourRoutes);
//app.use('/api/tenants', tenantsRoutes1(pool));
//app.use('/api/properties', propertiesRoutes1(pool));
//app.use('/api/leases', leasesRoutes1(pool));
//app.use('/api/financialTransactions', financialTransactionsRoutes1(pool));
//app.use('/api/maintenanceRequests', maintenanceRequestsRoutes1(pool));

// Connect to MongoDB
//connect('mongodb://localhost:27017/property_management_system', { useNewUrlParser: true, useUnifiedTopology: true });
//console.log('MongoDB URI:', mongoURI);
//connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Initialize Passport
//app.use(initialize());

// Include Passport strategies
//import './config/passport';

// Use authentication routes
//app.use('/auth', authRoutes);

// Handle MongoDB connection errors
//connection.on('error', (err) => {
  //console.error('MongoDB connection error:', err);
//});
// Log when MongoDB connection is successful
//connection.on('connected', () => {
  //console.log('Connected to MongoDB successfully');
//});
// Start the server
//app.listen(port, () => {
  //console.log(`Server listening at http://localhost:${port}`);
//});

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Optionally, you can exit the process if you want to
  // process.exit(1)
});

// Example middleware function for checking user roles
//const checkRole = (requiredRole) => {
  //return (req, res, next) => {
    //const user = req.user; // Assuming user information is stored in req.user after authentication

    //if (user && user.role === requiredRole) {
      //next(); // User has the required role, proceed to the next middleware or route handler
    //} else {
      //res.status(403).json({ error: 'Access denied' }); // User does not have the required role
    //}
  //};
//};

// Example usage of the middleware
//app.get('/api/properties', checkRole('admin'), (req, res) => {
  // Only admins can access this route
  // Handle property retrieval logic here
//});

//document.addEventListener("DOMContentLoaded", function() {
  // Function to load content into the main section
  //function loadContent(page) {
      //fetch(page)
          //.then(response => response.text())
          //.then(data => {
             // document.getElementById('content').innerHTML = data;
          //});
  //}

  // Event listener for navigation links
  ///document.querySelectorAll('nav a').forEach(link => {
      //link.addEventListener('click', function(event) {
          //event.preventDefault();
          //const page = this.getAttribute('href');
          //loadContent(page);
          //history.pushState(null, '', page);
      //});
  //});

  // Handle back/forward navigation
 // window.addEventListener('popstate', function() {
      //const page = location.pathname.substring(1) || 'index.html';
      //loadContent(page);
  //});

  // Load initial page
  ///const initialPage = location.pathname.substring(1) || 'index.html';
  //loadContent(initialPage);
//});

