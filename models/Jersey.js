/**
 * Jersey Model
 * Defines the schema and model for soccer jerseys in the database
 */

const mongoose = require('mongoose');

/**
 * Jersey Schema
 * Defines the structure of a jersey document in MongoDB
 */
const jerseySchema = new mongoose.Schema({
  // Team name (e.g., "Super Eagles", "Indomitable Lions")
  team: {
    type: String,
    required: [true, 'Team name is required'], // Validation: must be provided
    trim: true // Removes whitespace from beginning and end
  },
  
  // Country name (e.g., "Nigeria", "Cameroon", "Ghana")
  country: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true
  },
  
  // Price in USD (stored as a number)
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'] // Validation: must be 0 or positive
  },
  
  // URL or path to the jersey image
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  
  // Timestamps: automatically adds createdAt and updatedAt fields
}, {
  timestamps: true
});

/**
 * Create and export the Jersey model
 * This model will be used to interact with the 'jerseys' collection in MongoDB
 */
const Jersey = mongoose.model('Jersey', jerseySchema);

module.exports = Jersey;

