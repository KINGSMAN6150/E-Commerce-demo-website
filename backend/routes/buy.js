const express = require('express');
const router = express.Router();
const Watch = require('../models/watch');

router.get('/watches', async (req, res) => {
    try {
        const watches = await Watch.find().sort({ createdAt: -1 });
        res.json(watches);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching watches', error: error.message });
    }
});

module.exports = router;