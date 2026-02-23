// User management routes
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');

// Get current user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all members (protected route)
router.get('/members', verifyToken, async (req, res) => {
  try {
    const members = await User.find({ role: { $in: ['member', 'admin'] } })
      .select('-firebaseUid')
      .sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users with role info (admin only)
router.get('/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({})
      .select('-firebaseUid')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user role (admin only)
router.put('/:userId/role', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    if (!['member', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be "member" or "admin"' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log the role change
    const adminUser = await User.findOne({ firebaseUid: req.user.uid });
    console.log(`Role updated: ${user.email} -> ${role} by admin ${adminUser.email}`);

    res.json({ message: `User role updated to ${role}`, user });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user payment status (admin only)
router.put('/:userId/payment', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { paymentStatus } = req.body;

    if (!['paid', 'not_paid'].includes(paymentStatus)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { paymentStatus },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Payment status updated', user });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/me', verifyToken, async (req, res) => {
  try {
    const { firstName, lastName, major, graduationYear, phoneNumber } = req.body;
    
    const user = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      { firstName, lastName, major, graduationYear, phoneNumber },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete user (admin only)
router.delete('/:userId', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log the deletion
    const adminUser = await User.findOne({ firebaseUid: req.user.uid });
    console.log(`User deleted: ${user.email} by admin ${adminUser.email}`);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
