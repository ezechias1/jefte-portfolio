const express = require('express');
const { body, validationResult } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { protect } = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

const router = express.Router();

// GET /api/portfolio — public
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = { isPublished: true };
    if (category && category !== 'all') filter.category = category;
    if (featured === 'true') filter.featured = true;

    const items = await Portfolio.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/portfolio/featured — latest featured for homepage
router.get('/featured', async (req, res) => {
  try {
    const items = await Portfolio.find({ isPublished: true, featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/portfolio/:id — public
router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found.' });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/portfolio — admin only
router.post('/', protect, upload.single('media'), [
  body('title').notEmpty().trim(),
  body('category').isIn(['video', 'photography', 'editing']),
  body('mediaType').isIn(['image', 'video']),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const itemData = { ...req.body };

    if (req.file) {
      itemData.mediaUrl = req.file.path;
      itemData.cloudinaryId = req.file.filename;
      if (itemData.mediaType === 'video') {
        itemData.thumbnailUrl = req.file.path.replace('/upload/', '/upload/so_0,w_800/').replace(/\.\w+$/, '.jpg');
      }
    }

    if (itemData.tags && typeof itemData.tags === 'string') {
      itemData.tags = itemData.tags.split(',').map(t => t.trim());
    }

    const item = await Portfolio.create(itemData);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/portfolio/:id — admin only
router.put('/:id', protect, upload.single('media'), async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found.' });

    const updateData = { ...req.body };

    if (req.file) {
      // Delete old media from Cloudinary
      if (item.cloudinaryId) {
        await cloudinary.uploader.destroy(item.cloudinaryId, {
          resource_type: item.mediaType === 'video' ? 'video' : 'image',
        });
      }
      updateData.mediaUrl = req.file.path;
      updateData.cloudinaryId = req.file.filename;
    }

    if (updateData.tags && typeof updateData.tags === 'string') {
      updateData.tags = updateData.tags.split(',').map(t => t.trim());
    }

    const updated = await Portfolio.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/portfolio/:id — admin only
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found.' });

    if (item.cloudinaryId) {
      await cloudinary.uploader.destroy(item.cloudinaryId, {
        resource_type: item.mediaType === 'video' ? 'video' : 'image',
      });
    }

    await item.deleteOne();
    res.json({ success: true, message: 'Portfolio item deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
