// Event management routes
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const { verifyToken, verifyAdmin } = require('../middleware/verifyToken');

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single event by ID
router.get('/:eventId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new event (admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, date, time, location, description } = req.body;

    const newEvent = new Event({
      name,
      date,
      time,
      location,
      description,
      createdBy: req.user.uid,
      attendees: []
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Update event (admin only)
router.put('/:eventId', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, date, time, location, description } = req.body;
    
    const event = await Event.findByIdAndUpdate(
      req.params.eventId,
      { name, date, time, location, description },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', event });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete event (admin only)
router.delete('/:eventId', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.eventId);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// RSVP to event (member only)
router.post('/:eventId/rsvp', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if user already RSVP'd
    const alreadyRsvped = event.attendees.some(
      attendee => attendee.userId === req.user.uid
    );

    if (alreadyRsvped) {
      return res.status(400).json({ error: 'Already RSVP\'d to this event' });
    }

    // Get user info
    const user = await User.findOne({ firebaseUid: req.user.uid });
    
    // Add attendee
    event.attendees.push({
      userId: req.user.uid,
      userName: `${user.firstName} ${user.lastName}`,
      rsvpDate: new Date()
    });

    await event.save();
    res.json({ message: 'RSVP successful', event });
  } catch (error) {
    console.error('Error RSVPing to event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get event attendees (admin only)
router.get('/:eventId/attendees', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event.attendees);
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
