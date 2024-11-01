const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass:', process.env.EMAIL_PASS ? 'Set' : 'Not Set');

// Create transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Subscribe route
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        // Send confirmation email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Welcome to Auction Reminder Service',
            html: `
                <h1>Welcome to Our Auction Service!</h1>
                <p>Thank you for subscribing to our reminder service.</p>
                <p>You will now receive updates about new auctions and reminders for your watched items.</p>
                <br>
                <p>Best regards,</p>
                <p>Your Auction Team</p>
            `
        });

        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send confirmation email' });
    }
});

module.exports = router;