// Authentication routes
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/verifyToken');
const { getRoleForEmail } = require('../config/adminEmails');

// Register new user
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { firebaseUid, email, firstName, lastName, major, graduationYear, phoneNumber, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ firebaseUid });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    // Validate Wayne State email
    if (!email.endsWith('@wayne.edu')) {
      return res.status(400).json({ error: 'Must use Wayne State University email' });
    }

    // Automatically determine role based on email (overrides any role sent from frontend)
    const assignedRole = getRoleForEmail(email);

    // Create new user
    const newUser = new User({
      firebaseUid,
      email,
      firstName,
      lastName,
      major,
      graduationYear,
      phoneNumber,
      role: assignedRole, // Use automatically determined role
      paymentStatus: 'not_paid'
    });

    await newUser.save();
    
    console.log(`User registered: ${email} with role: ${assignedRole}`);
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      user: newUser,
      assignedRole: assignedRole
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// Endpoint to promote user to admin (admin only)
router.put('/promote/:userId', verifyToken, async (req, res) => {
  try {
    // Check if current user is admin
    const currentUser = await User.findOne({ firebaseUid: req.user.uid });
    if (!currentUser || currentUser.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }

    const { userId } = req.params;
    const { role } = req.body;

    if (!['member', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(`User role updated: ${user.email} -> ${role} by ${currentUser.email}`);

    res.json({ 
      message: `User role updated to ${role}`, 
      user: user 
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
