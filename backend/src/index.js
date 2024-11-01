const express = require('express');
const connectDB = require('../config/db.js');
const cors = require('cors');
const emailRoutes = require('../routes/email.js');
require('dotenv').config();

const app = express();

// Set the MongoDB URI directly
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auction";

// Log to confirm the values
console.log("MONGO_URI:", MONGO_URI);
console.log("JWT_SECRET is set:", !!process.env.JWT_SECRET);

// Connect to MongoDB
connectDB(MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('../routes/auth.js'));
app.use('/api/reminder', require('../routes/reminder.js')); // Add this line
app.use('/api/email', emailRoutes);

// Error Handling for Unknown Routes
app.use((req, res, next) => {
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