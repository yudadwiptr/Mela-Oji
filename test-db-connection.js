// Simple script to test MongoDB connection
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  console.log('Testing MongoDB connection...');
  console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
    
    // Create a simple model
    const TestModel = mongoose.model('Test', new mongoose.Schema({
      message: String,
      createdAt: { type: Date, default: Date.now }
    }));
    
    // Create a test document
    const testDoc = new TestModel({ message: 'Test connection' });
    await testDoc.save();
    console.log('Successfully created test document!');
    
    // Query all test documents
    const docs = await TestModel.find().limit(5);
    console.log('Retrieved documents:', docs);
    
    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

testConnection();
