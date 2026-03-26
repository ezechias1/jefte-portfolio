const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  projectType: {
    type: String,
    required: true,
    enum: ['wedding', 'corporate', 'music-video', 'documentary', 'photography', 'social-media', 'other'],
  },
  budgetRange: {
    type: String,
    enum: ['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus', 'discuss'],
  },
  deadline: { type: Date },
  description: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'quoted', 'accepted', 'declined'],
    default: 'new',
  },
  adminNotes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', quoteSchema);
