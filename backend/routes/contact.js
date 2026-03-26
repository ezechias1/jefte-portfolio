const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendContactNotification } = require('../utils/email');

const router = express.Router();

// POST /api/contact
router.post('/', [
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('message').notEmpty().trim().isLength({ max: 2000 }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, email, message } = req.body;
    sendContactNotification({ name, email, message }).catch(err => console.error('Email error:', err));

    res.json({ success: true, message: 'Message sent! I\'ll get back to you soon.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
