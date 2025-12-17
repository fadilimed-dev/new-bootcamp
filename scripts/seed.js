/**
 * Seed Script
 * Populates the database with sample African soccer jersey data
 * Run this script with: npm run seed
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Jersey = require('../models/Jersey');

/**
 * Sample jersey data for African national teams
 */
const sampleJerseys = [
  {
    team: 'Super Eagles',
    country: 'Nigeria',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
  },
  {
    team: 'Indomitable Lions',
    country: 'Cameroon',
    price: 54.99,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
  },
  {
    team: 'Black Stars',
    country: 'Ghana',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
  },
  {
    team: 'Bafana Bafana',
    country: 'South Africa',
    price: 52.99,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
  },
  {
    team: 'Elephants',
    country: 'Ivory Coast',
    price: 55.99,
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop'
  }
];

/**
 * Connect to MongoDB and seed the database
 */
async function seedDatabase() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jersey-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing jerseys (optional - comment out if you want to keep existing data)
    await Jersey.deleteMany({});
    console.log('🗑️  Cleared existing jerseys');
    
    // Insert sample jerseys
    const insertedJerseys = await Jersey.insertMany(sampleJerseys);
    console.log(`✅ Inserted ${insertedJerseys.length} jerseys`);
    
    // Display inserted jerseys
    console.log('\n📦 Sample Jerseys Added:');
    insertedJerseys.forEach(jersey => {
      console.log(`   - ${jersey.team} (${jersey.country}) - $${jersey.price}`);
    });
    
    // Close the database connection
    await mongoose.connection.close();
    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();

