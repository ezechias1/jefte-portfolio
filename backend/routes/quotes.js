const express = require('express');
const { body, validationResult } = require('express-validator');
const Quote = require('../models/Quote');
const { protect } = require('../middleware/auth');
const { sendQuoteNotification } = require('../utils/email');

const router = express.Router();

// POST /api/quotes — public
router.post('/', [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('projectType').isIn(['wedding', 'corporate', 'music-video', 'documentary', 'photography', 'social-media', 'other']),
  body('description').notEmpty().trim(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const quote = await Quote.create(req.body);
    sendQuoteNotification(quote).catch(err => console.error('Email error:', err));

    res.status(201).json({
      success: true,
      message: 'Quote request received! I\'ll prepare a detailed proposal within 48 hours.',
      data: { id: quote._id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/quotes — admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const quotes = await Quote.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Quote.countDocuments(filter);
    res.json({ success: true, data: quotes, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/quotes/:id — admin only
router.put('/:id', protect, async (req, res) => {
  try {
    const quote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quote) return res.status(404).json({ success: false, message: 'Quote not found.' });
    res.json({ success: true, data: quote });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
