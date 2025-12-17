/**
 * app.js - Main Entry Point
 * 
 * This is the main server file that sets up and starts the Express application.
 * It configures middleware, connects to MongoDB, sets up view engine (Handlebars),
 * and registers routes for the soccer jersey store.
 */

// Import required modules
const express = require('express'); // Express framework for building the web server
const mongoose = require('mongoose'); // Mongoose for MongoDB object modeling
const exphbs = require('express-handlebars'); // Handlebars template engine for Express
const path = require('path'); // Node.js path module for handling file paths
require('dotenv').config(); // Load environment variables from .env file

// Import route handlers
const jerseyRoutes = require('./routes/jerseys'); // Import jersey routes/controllers

// Create Express application instance
const app = express();

// Get port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Get MongoDB connection string from environment variable
// Replace this with your MongoDB Atlas connection string in .env file
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://your-connection-string-here';

/**
 * MongoDB Connection
 * 
 * Connects to MongoDB Atlas using Mongoose.
 * The connection string should be in format:
 * mongodb+srv://username:password@cluster.mongodb.net/database-name
 */
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true, // Use new URL parser (required for MongoDB Atlas)
  useUnifiedTopology: true // Use new server discovery and monitoring engine
})
  .then(() => {
    // Success callback - runs when connection is established
    console.log('✅ Connected to MongoDB Atlas successfully');
  })
  .catch((error) => {
    // Error callback - runs if connection fails
    console.error('❌ MongoDB connection error:', error.message);
    console.log('⚠️  Make sure to set MONGODB_URI in your .env file');
  });

/**
 * Middleware Configuration
 * 
 * Middleware functions execute in order and can modify request/response objects
 */

// Parse incoming request bodies as JSON
// This allows us to access form data via req.body
app.use(express.json());

// Parse URL-encoded bodies (form submissions)
// extended: true allows parsing of rich objects and arrays
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
// This makes CSS, images, and other static assets accessible
// Example: /css/style.css will serve public/css/style.css
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Handlebars View Engine Configuration
 * 
 * Sets up Handlebars as the template engine for rendering views.
 * This allows us to create dynamic HTML templates.
 */
app.engine('hbs', exphbs.engine({
  extname: 'hbs', // Use .hbs extension for template files
  defaultLayout: 'main', // Use 'main.hbs' as the default layout
  layoutsDir: path.join(__dirname, 'views/layouts'), // Location of layout files
  partialsDir: path.join(__dirname, 'views/partials') // Location of partial files (optional)
}));

// Set 'hbs' as the default view engine
app.set('view engine', 'hbs');

// Set the directory where view templates are located
app.set('views', path.join(__dirname, 'views'));

/**
 * Routes Configuration
 * 
 * Register route handlers for different URL paths.
 * All jersey-related routes are handled by the jerseyRoutes module.
 */
app.use('/', jerseyRoutes); // Mount jersey routes at root path

/**
 * 404 Error Handler
 * 
 * This middleware catches any requests that don't match any routes.
 * It should be placed after all other route handlers.
 */
app.use((req, res) => {
  // Render a 404 error page
  res.status(404).render('404', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.'
  });
});

/**
 * Global Error Handler
 * 
 * Catches any errors that occur during request processing.
 * This is a safety net to prevent the server from crashing.
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).render('error', {
    title: 'Server Error',
    message: 'Something went wrong on the server.'
  });
});

/**
 * Start Server
 * 
 * Listen for incoming connections on the specified PORT.
 * Once the server starts, this callback function runs.
 */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Make sure MongoDB Atlas connection string is set in .env file`);
});

