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
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
});

const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// POST route to add a new watch
router.post('/add-watch', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }

        const { name, brand, model, condition, startingBid, auctionEndTime, description } = req.body;
        
        // Create the image URL
        const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;

        const newWatch = new Watch({
            name,
            brand,
            model,
            condition,
            starting_bid: startingBid,
            auction_end_time: auctionEndTime,
            description,
            image: imageUrl
        });

        await newWatch.save();
        res.status(201).json({ 
            message: 'Watch added successfully', 
            watch: newWatch 
        });
    } catch (error) {
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