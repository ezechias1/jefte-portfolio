const express = require('express');
const { protect } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Quote = require('../models/Quote');
const Portfolio = require('../models/Portfolio');

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const [totalPortfolio, totalBookings, pendingBookings, totalQuotes, newQuotes] = await Promise.all([
      Portfolio.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: 'pending' }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: 'new' }),
    ]);

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentQuotes = await Quote.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      data: {
        portfolio: totalPortfolio,
        bookings: { total: totalBookings, pending: pendingBookings },
        quotes: { total: totalQuotes, new: newQuotes },
        recentBookings,
        recentQuotes,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
