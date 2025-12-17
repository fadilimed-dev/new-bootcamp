/**
 * models/Jersey.js - Jersey Data Model
 * 
 * This file defines the Mongoose schema and model for soccer jerseys.
 * A schema defines the structure of documents (records) in the MongoDB collection.
 * The model provides methods to interact with the database (create, read, update, delete).
 */

// Import Mongoose library
const mongoose = require('mongoose');

/**
 * Jersey Schema Definition
 * 
 * This schema defines what fields a jersey document will have in MongoDB.
 * Each field has a type and can have validation rules.
 */
const jerseySchema = new mongoose.Schema({
  /**
   * name - String field for the jersey name
   * required: true means this field must be provided when creating a jersey
   * trim: true automatically removes whitespace from the beginning and end
   * Example: "Home Jersey 2023"
   */
  name: {
    type: String,
    required: [true, 'Jersey name is required'], // Error message if missing
    trim: true
  },

  /**
   * team - String field for the team name
   * required: true means this field must be provided
   * trim: true automatically removes whitespace
   * Example: "Manchester United", "Barcelona", "Real Madrid"
   */
  team: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true
  },

  /**
   * price - Number field for the jersey price
   * required: true means this field must be provided
   * min: 0 ensures price cannot be negative
   * Example: 49.99, 79.50
   */
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'] // Validation: price must be >= 0
  },

  /**
   * imageUrl - String field for the image URL
   * required: true means this field must be provided
   * trim: true automatically removes whitespace
   * This can be a URL to an external image or a path to an uploaded image
   * Example: "https://example.com/jersey.jpg" or "/images/jersey.jpg"
   */
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  }
}, {
  /**
   * Schema Options
   * 
   * timestamps: true automatically adds 'createdAt' and 'updatedAt' fields
   * These fields track when each document was created and last modified
   */
  timestamps: true
});

/**
 * Create and Export Jersey Model
 * 
 * mongoose.model() creates a model from the schema.
 * The first argument 'Jersey' is the model name (singular).
 * Mongoose will automatically create a collection named 'jerseys' (plural) in MongoDB.
 * 
 * This model can now be used to:
 * - Create new jerseys: Jersey.create({...})
 * - Find jerseys: Jersey.find()
 * - Update jerseys: Jersey.findByIdAndUpdate()
 * - Delete jerseys: Jersey.findByIdAndDelete()
 */
const Jersey = mongoose.model('Jersey', jerseySchema);

// Export the model so it can be imported in other files (like routes)
module.exports = Jersey;

