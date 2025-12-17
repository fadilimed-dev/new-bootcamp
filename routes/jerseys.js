/**
 * Jersey Routes
 * Handles all HTTP requests related to jerseys (CRUD operations)
 */

const express = require('express');
const router = express.Router();
const Jersey = require('../models/Jersey');

/**
 * GET / (Homepage)
 * Displays all jerseys in the store
 */
router.get('/', async (req, res) => {
  try {
    // Fetch all jerseys from the database
    // The empty object {} means "get all documents"
    const jerseys = await Jersey.find({}).sort({ createdAt: -1 }); // Sort by newest first
    
    // Render the 'home' view with the jerseys data
    res.render('home', {
      title: 'African Soccer Jersey Store',
      jerseys: jerseys // Pass jerseys to the template
    });
  } catch (error) {
    // If there's an error, log it and send a 500 error response
    console.error('Error fetching jerseys:', error);
    res.status(500).send('Error loading jerseys');
  }
});

/**
 * GET /jersey/:id
 * Displays detailed information about a specific jersey
 * :id is a route parameter that represents the jersey's MongoDB _id
 */
router.get('/jersey/:id', async (req, res) => {
  try {
    // Find the jersey by its ID
    // req.params.id contains the ID from the URL
    const jersey = await Jersey.findById(req.params.id);
    
    // If jersey doesn't exist, return 404
    if (!jersey) {
      return res.status(404).render('404', {
        title: 'Jersey Not Found'
      });
    }
    
    // Render the 'detail' view with the jersey data
    res.render('detail', {
      title: `${jersey.team} - ${jersey.country}`,
      jersey: jersey
    });
  } catch (error) {
    console.error('Error fetching jersey:', error);
    res.status(500).send('Error loading jersey details');
  }
});

/**
 * GET /admin
 * Displays the admin form for adding/editing jerseys
 * If an ID is provided as a query parameter, it loads that jersey for editing
 */
router.get('/admin', async (req, res) => {
  try {
    let jersey = null;
    
    // Check if an ID was provided in the query string (e.g., /admin?id=123)
    if (req.query.id) {
      jersey = await Jersey.findById(req.query.id);
      
      // If jersey not found, redirect to admin page without ID
      if (!jersey) {
        return res.redirect('/admin');
      }
    }
    
    // Render the admin form
    // If jersey exists, it's in edit mode; otherwise, it's in add mode
    res.render('admin', {
      title: 'Admin - Manage Jerseys',
      jersey: jersey // Pass jersey if editing, null if adding new
    });
  } catch (error) {
    console.error('Error loading admin page:', error);
    res.status(500).send('Error loading admin page');
  }
});

/**
 * POST /admin
 * Creates a new jersey in the database
 * This route is called when the admin form is submitted to add a new jersey
 */
router.post('/admin', async (req, res) => {
  try {
    // Extract data from the form submission (req.body contains form data)
    const { team, country, price, imageUrl } = req.body;
    
    // Create a new jersey document using the Jersey model
    const newJersey = new Jersey({
      team: team,
      country: country,
      price: parseFloat(price), // Convert string to number
      imageUrl: imageUrl
    });
    
    // Save the jersey to the database
    await newJersey.save();
    
    // Redirect to homepage after successful creation
    res.redirect('/');
  } catch (error) {
    console.error('Error creating jersey:', error);
    res.status(500).send('Error creating jersey');
  }
});

/**
 * PUT /admin/:id
 * Updates an existing jersey in the database
 * :id is the jersey's MongoDB _id
 * This route is called when the admin form is submitted to update a jersey
 */
router.put('/admin/:id', async (req, res) => {
  try {
    // Extract data from the form submission
    const { team, country, price, imageUrl } = req.body;
    
    // Find the jersey by ID and update it with new data
    // { new: true } returns the updated document instead of the original
    const updatedJersey = await Jersey.findByIdAndUpdate(
      req.params.id,
      {
        team: team,
        country: country,
        price: parseFloat(price), // Convert string to number
        imageUrl: imageUrl
      },
      { new: true } // Return the updated document
    );
    
    // If jersey not found, return 404
    if (!updatedJersey) {
      return res.status(404).send('Jersey not found');
    }
    
    // Redirect to the jersey detail page after successful update
    res.redirect(`/jersey/${updatedJersey._id}`);
  } catch (error) {
    console.error('Error updating jersey:', error);
    res.status(500).send('Error updating jersey');
  }
});

/**
 * DELETE /admin/:id
 * Deletes a jersey from the database
 * :id is the jersey's MongoDB _id
 */
router.delete('/admin/:id', async (req, res) => {
  try {
    // Find and delete the jersey by ID
    const deletedJersey = await Jersey.findByIdAndDelete(req.params.id);
    
    // If jersey not found, return 404
    if (!deletedJersey) {
      return res.status(404).send('Jersey not found');
    }
    
    // Redirect to homepage after successful deletion
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting jersey:', error);
    res.status(500).send('Error deleting jersey');
  }
});

// Export the router so it can be used in server.js
module.exports = router;

