// In backend/routes/bids.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Create a bid schema in models/Bid.js
const Bid = require('../models/Bid');

router.post('/place-bid', authMiddleware, async (req, res) => {
    try {
        const { productId, bidAmount } = req.body;
        const userId = req.user;

        // Validate bid amount
        if (bidAmount > 10000) {
            return res.status(400).json({ message: "Bid cannot exceed $10,000" });
        }

        // Get current highest bid
        const currentHighestBid = await Bid.findOne({ productId }).sort('-amount');
        
        if (currentHighestBid && bidAmount <= currentHighestBid.amount) {
            return res.status(400).json({ message: "Bid must be higher than current bid" });
        }

        // Create new bid
        const newBid = new Bid({
            productId,
            userId,
            amount: bidAmount,
        });

        await newBid.save();

        res.status(201).json({ message: "Bid placed successfully", bid: newBid });
    } catch (error) {
        res.status(500).json({ message: "Error placing bid", error: error.message });
    }
});

router.get('/product/:productId/bids', async (req, res) => {
    try {
        const bids = await Bid.find({ productId: req.params.productId })
            .sort('-amount')
            .limit(10);
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bids", error: error.message });
    }
});

module.exports = router;