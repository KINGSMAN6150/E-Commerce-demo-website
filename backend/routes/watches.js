const express = require('express');
const router = express.Router();
const Watch = require('../models/watch');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        cb(null, 'watch-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Create new watch listing
router.post('/create', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const {
            name,
            brand,
            model,
            description,
            condition,
            starting_bid,
            auction_end_time
        } = req.body;

        const newWatch = new Watch({
            name,
            brand,
            model,
            description,
            condition,
            starting_bid,
            image_url: `/uploads/${req.file.filename}`,
            seller_id: req.userId,
            auction_end_time
        });

        await newWatch.save();
        res.status(201).json(newWatch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all watches
router.get('/', async (req, res) => {
    try {
        const watches = await Watch.find({ status: 'active' })
            .sort({ created_at: -1 });
        res.json(watches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Place bid
router.post('/:watchId/bid', authMiddleware, async (req, res) => {
    try {
        const watch = await Watch.findById(req.params.watchId);
        if (!watch) {
            return res.status(404).json({ message: 'Watch not found' });
        }

        const bidAmount = parseFloat(req.body.bid_amount);
        if (bidAmount <= watch.current_bid || bidAmount <= watch.starting_bid) {
            return res.status(400).json({ message: 'Bid must be higher than current bid' });
        }

        watch.current_bid = bidAmount;
        await watch.save();

        res.json(watch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;