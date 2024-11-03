// backend/routes/bids.js
const express = require('express');
const router = express.Router();
const Bid = require('../models/bids.js');
const authMiddleware = require('../middleware/authMiddleware');

// Place a bid
router.post('/place-bid', authMiddleware, async (req, res) => {
    try {
        const { watchId, bidAmount } = req.body;
        
        // Get highest bid for this watch
        const highestBid = await Bid.findOne({ watchId })
            .sort('-bidAmount');

        if (highestBid && bidAmount <= highestBid.bidAmount) {
            return res.status(400).json({
                message: 'Bid must be higher than current highest bid'
            });
        }

        const newBid = new Bid({
            watchId,
            bidAmount,
            bidderName: req.user.name
        });

        await newBid.save();

        res.status(200).json({
            message: 'Bid placed successfully',
            bid: newBid
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get highest bid for a watch
router.get('/highest/:watchId', async (req, res) => {
    try {
        const highestBid = await Bid.findOne({ watchId: req.params.watchId })
            .sort('-bidAmount');
        
        res.json(highestBid || { bidAmount: 0, bidderName: 'No bids yet' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;