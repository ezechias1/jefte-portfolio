const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  category: {
    type: String,
    required: true,
    enum: ['video', 'photography', 'editing'],
  },
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  mediaUrl: { type: String, required: true },
  thumbnailUrl: { type: String },
  cloudinaryId: { type: String },
  // For embedded videos (YouTube/Vimeo)
  embedUrl: { type: String },
  tags: [{ type: String, trim: true }],
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  client: { type: String, trim: true },
  year: { type: Number },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

portfolioSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

portfolioSchema.index({ category: 1, isPublished: 1, order: 1 });
portfolioSchema.index({ featured: 1, isPublished: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);
