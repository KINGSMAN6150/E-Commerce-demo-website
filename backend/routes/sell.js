const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Watch = require('../models/watch');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// POST route to add a new watch
router.post('/add-watch', upload.single('image'), async (req, res) => {
    console.log('Received request to add watch'); // Debug log
    console.log('Request body:', req.body); // Debug log
    console.log('File:', req.file); // Debug log

    try {
        if (!req.file) {
            console.log('No image file received'); // Debug log
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
        
        const newWatch = new Watch({
            name: req.body.name,
            brand: req.body.brand,
            model: req.body.model,
            condition: req.body.condition,
            starting_bid: req.body.startingBid,
            auction_end_time: req.body.auctionEndTime,
            description: req.body.description,
            image: imageUrl
        });

        console.log('Attempting to save watch:', newWatch); // Debug log

        await newWatch.save();
        console.log('Watch saved successfully'); // Debug log

        res.status(201).json({ 
            message: 'Watch added successfully', 
            watch: newWatch 
        });
    } catch (error) {
        console.error('Error saving watch:', error); // Debug log
        // If there's an error, remove the uploaded file
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error removing uploaded file:', err);
            });
        }
        res.status(500).json({ 
            message: 'Error adding watch', 
            error: error.message 
        });
    }
});

module.exports = router;