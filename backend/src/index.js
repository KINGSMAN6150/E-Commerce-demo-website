// server.js or app.js
const express = require('express');
const connectDB = require('../config/db.js');
const cors = require('cors');

const app = express();

// Set the MongoDB URI directly
const MONGO_URI = "mongodb://localhost:27017/auction";
const JWT_SECRET = "525eb5240ab9e6dc529f4723bcd8de8d675dbbfee6a6705c9ed6e27d9be7f4f8c435d27cfbf89eb5657e5e164d93bdf3eedd28f674c2fdc6e4a68466c0399a9a";

// Log to confirm the values
console.log("MONGO_URI:", MONGO_URI);
console.log("JWT_SECRET:", JWT_SECRET);

// Connect to MongoDB
connectDB(MONGO_URI); // Pass MONGO_URI to connectDB

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/auth', require('../routes/auth.js'));

// Error Handling for Unknown Routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.error("Failed to start the server:", err.message);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});
