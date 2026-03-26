const express = require('express');
const { body, validationResult } = require('express-validator');
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');
const { sendBookingNotification } = require('../utils/email');

const router = express.Router();

// POST /api/bookings — public
router.post('/', [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('service').isIn(['video-editing', 'event-videography', 'photography', 'other']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const booking = await Booking.create(req.body);

    // Send email notifications (non-blocking)
    sendBookingNotification(booking).catch(err => console.error('Email error:', err));

    res.status(201).json({
      success: true,
      message: 'Booking request received! I\'ll be in touch within 24–48 hours.',
      data: { id: booking._id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/bookings — admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);

    res.json({ success: true, data: bookings, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/bookings/:id — admin only (update status)
router.put('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
