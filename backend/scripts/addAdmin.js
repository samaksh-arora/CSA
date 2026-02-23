// Script to manually promote a user to admin
// Usage: node scripts/addAdmin.js <email>

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');

const addAdmin = async (email) => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Find and update user
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { role: 'admin' },
      { new: true }
    );

    if (user) {
      console.log(`✅ Successfully promoted ${email} to admin`);
      console.log(`User: ${user.firstName} ${user.lastName} (${user.email})`);
    } else {
      console.log(`❌ User with email ${email} not found`);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

// Get email from command line arguments
const email = process.argv[2];

if (!email) {
  console.log('Usage: node scripts/addAdmin.js <email>');
  console.log('Example: node scripts/addAdmin.js samaksharora09@wayne.edu');
  process.exit(1);
}

addAdmin(email);