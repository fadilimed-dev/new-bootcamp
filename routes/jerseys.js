/**
 * routes/jerseys.js - Jersey Routes and Controllers
 * 
 * This file handles all HTTP routes related to soccer jerseys.
 * It follows the MVC pattern where this file acts as both routes and controllers.
 * 
 * Routes defined:
 * - GET  /           - Homepage (list all jerseys)
 * - GET  /jersey/:id - View single jersey details
 * - GET  /add        - Show form to add new jersey
 * - POST /add        - Process form submission to create new jersey
 */

// Import required modules
const express = require('express'); // Express Router for defining routes
const router = express.Router(); // Create a new router instance

// Import the Jersey model to interact with the database
const Jersey = require('../models/Jersey');

/**
 * GET / - Homepage Route
 * 
 * This route displays the homepage with a list of all soccer jerseys.
 * It fetches all jerseys from MongoDB and renders them in the home.hbs template.
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all jerseys from the database
    // find() with empty object {} returns all documents
    // sort({ createdAt: -1 }) sorts by creation date, newest first
    const jerseys = await Jersey.find({}).sort({ createdAt: -1 });

    // Render the 'home' view template with the jerseys data
    // The second argument is an object containing data to pass to the template
    res.render('home', {
      title: 'Soccer Jersey Store', // Page title
      jerseys: jerseys // Array of jersey objects to display
    });
  } catch (error) {
    // If an error occurs (e.g., database connection issue), log it and show error page
    console.error('Error fetching jerseys:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load jerseys. Please try again later.'
    });
  }
});

/**
 * GET /jersey/:id - Jersey Detail Route
 * 
 * This route displays detailed information about a specific jersey.
 * :id is a route parameter that captures the jersey's MongoDB _id.
 * Example: /jersey/507f1f77bcf86cd799439011
 */
router.get('/jersey/:id', async (req, res) => {
  try {
    // Extract the jersey ID from the URL parameter
    // req.params.id contains the value of :id from the URL
    const jerseyId = req.params.id;

    // Find the jersey by its ID in the database
    // findById() is a Mongoose method that finds a document by _id
    const jersey = await Jersey.findById(jerseyId);

    // Check if jersey was found
    if (!jersey) {
      // If no jersey found, return 404 error
      return res.status(404).render('error', {
        title: 'Jersey Not Found',
        message: 'The jersey you are looking for does not exist.'
      });
    }

    // Render the 'jersey' view template with the jersey data
    res.render('jersey', {
      title: jersey.name, // Page title is the jersey name
      jersey: jersey // The jersey object with all its details
    });
  } catch (error) {
    // Handle errors (e.g., invalid ID format, database error)
    console.error('Error fetching jersey:', error);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load jersey details. Please try again later.'
    });
  }
});

/**
 * GET /add - Show Add Jersey Form
 * 
 * This route displays a form where users can add a new jersey.
 * It only renders the form page, it doesn't process any data.
 */
router.get('/add', (req, res) => {
  // Render the 'add' view template (the form)
  res.render('add', {
    title: 'Add New Jersey' // Page title
  });
});

/**
 * POST /add - Process Add Jersey Form Submission
 * 
 * This route handles the form submission when a user adds a new jersey.
 * It receives the form data, validates it, saves it to MongoDB, and redirects.
 */
router.post('/add', async (req, res) => {
  try {
    // Extract form data from the request body
    // req.body contains the form fields (name, team, price, imageUrl)
    // This is available because we use express.urlencoded() middleware in app.js
    const { name, team, price, imageUrl } = req.body;

    // Create a new jersey document in the database
    // Jersey.create() is a Mongoose method that creates and saves a new document
    // It automatically validates the data against the schema defined in models/Jersey.js
    const newJersey = await Jersey.create({
      name: name, // Jersey name from form
      team: team, // Team name from form
      price: parseFloat(price), // Convert price string to number
      imageUrl: imageUrl // Image URL from form
    });

    // After successful creation, redirect to the homepage
    // This prevents form resubmission on page refresh
    res.redirect('/');
  } catch (error) {
    // Handle validation errors or database errors
    console.error('Error creating jersey:', error);

    // Check if it's a validation error (from Mongoose schema)
    if (error.name === 'ValidationError') {
      // Extract error messages from validation errors
      const errors = Object.values(error.errors).map(err => err.message);
      
      // Re-render the form with error messages
      return res.render('add', {
        title: 'Add New Jersey',
        errors: errors, // Pass errors to template
        formData: req.body // Keep form data so user doesn't lose their input
      });
    }

    // For other errors, show generic error page
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to create jersey. Please try again later.'
    });
  }
});

// Export the router so it can be used in app.js
module.exports = router;

