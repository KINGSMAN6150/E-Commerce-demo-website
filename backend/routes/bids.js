// In backend/routes/bids.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const Bid = require('../models/bids.js');
const Watch = require('../models/watch');

router.post('/place-bid', authMiddleware, async (req, res) => {
    try {
        const { productId, bidAmount } = req.body;
        const userId = req.user;

        // Validate bid amount
        if (!bidAmount || bidAmount <= 0) {
            return res.status(400).json({ message: "Invalid bid amount" });
        }

        // Find the product
        let watch;
        if (mongoose.Types.ObjectId.isValid(productId)) {
            watch = await Watch.findById(productId);
        } else {
            // If productId is not a valid ObjectId, try to find by numeric ID
            watch = await Watch.findOne({ id: parseInt(productId) });
        }

        if (!watch) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Get current highest bid
        const currentHighestBid = await Bid.findOne({ productId: watch._id })
            .sort('-amount');
        
        const minimumBid = currentHighestBid 
            ? currentHighestBid.amount 
            : watch.starting_bid;

        if (bidAmount <= minimumBid) {
            return res.status(400).json({ 
                message: `Bid must be higher than ${minimumBid}`
            });
        }

        // Create new bid
        const newBid = new Bid({
            productId: watch._id,
            userId,
            amount: bidAmount,
        });

        await newBid.save();

        // Update the watch's current bid
        watch.starting_bid = bidAmount;
        await watch.save();

        res.status(201).json({ 
            message: "Bid placed successfully", 
            bid: newBid,
            currentBid: bidAmount
        });
    } catch (error) {
        console.error('Bid error:', error);
        res.status(500).json({ 
            message: "Error placing bid", 
            error: error.message 
        });
    }
});

// Get bid history for a product
router.get('/product/:productId/bids', async (req, res) => {
    try {
        const { productId } = req.params;
        
        let watch;
        if (mongoose.Types.ObjectId.isValid(productId)) {
            watch = await Watch.findById(productId);
        } else {
            watch = await Watch.findOne({ id: parseInt(productId) });
        }

        if (!watch) {
            return res.status(404).json({ message: "Product not found" });
        }

        const bids = await Bid.find({ productId: watch._id })
            .sort('-amount')
            .limit(10)
            .populate('userId', 'name');

        res.json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ 
            message: "Error fetching bids", 
            error: error.message 
        });
    }
});

module.exports = router;