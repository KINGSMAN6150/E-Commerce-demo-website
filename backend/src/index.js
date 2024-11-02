const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const connectDB = require('../config/db.js');
require('dotenv').config();

const app = express();

// Set MongoDB URI and connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auction";
connectDB(MONGO_URI);

// Log configuration values
console.log("MONGO_URI:", MONGO_URI);
console.log("JWT_SECRET is set:", !!process.env.JWT_SECRET);

// Create 'uploads' directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up Multer storage and file size limit (5MB)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/api/auth', require('../routes/auth.js'));
app.use('/api/reminder', require('../routes/reminder.js'));
app.use('/api/email', require('../routes/email.js'));
app.use('/api/sell', require('../routes/sell.js'));
app.use('/api/buy', require('../routes/buy.js'));
app.use('/api/buy', require('../routes/buy'));

// Error Handling Middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File is too large. Maximum size is 5MB' });
        }
    }
    res.status(500).json({ message: error.message || 'Something went wrong' });
});



// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start the server:", err.message);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
