/**
 * Main Server File
 * This file sets up the Express server, connects to MongoDB Atlas,
 * configures Handlebars, and sets up all routes
 */

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
require('dotenv').config();

// Import routes
const jerseyRoutes = require('./routes/jerseys');

// Initialize Express app
const app = express();

// Get port from environment variable or use default 3000
const PORT = process.env.PORT || 3000;

/**
 * Connect to MongoDB Atlas
 * Uses connection string from .env file
 */
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jersey-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit the process if database connection fails
  });

/**
 * Middleware Configuration
 */

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (for API requests)
app.use(express.json());

// Method override for PUT and DELETE requests from forms
// Allows us to use PUT and DELETE methods via HTML forms
app.use(methodOverride('_method'));

// Serve static files from the 'public' directory
// This makes images, CSS, and JavaScript files accessible
app.use(express.static('public'));

/**
 * Handlebars Configuration
 * Sets up the templating engine for rendering views
 */
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main', // Use 'main.handlebars' as the default layout
  extname: '.handlebars' // File extension for Handlebars templates
}));
app.set('view engine', 'handlebars');

/**
 * Routes Configuration
 * All jersey-related routes are handled in the routes/jerseys.js file
 */
app.use('/', jerseyRoutes);

/**
 * 404 Error Handler
 * This catches any routes that don't match the defined routes above
 */
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found'
  });
});

/**
 * Start the server
 * Listens on the specified PORT and logs a message when ready
 */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
});

