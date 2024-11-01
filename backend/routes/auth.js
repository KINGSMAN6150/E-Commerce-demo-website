const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware

// Signup Route
router.post('/signup', async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, phone, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully." });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: existingUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Send token and user info (excluding password)
        const userWithoutPassword = { ...existingUser._doc };
        delete userWithoutPassword.password;

        res.status(200).json({
            message: "Login successful.",
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// User retrieval Route
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
