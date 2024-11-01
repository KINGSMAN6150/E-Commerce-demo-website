const express = require('express');
const router = express.Router();
const transporter = require('../config/emailConfig');

// Subscribe route
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Sending subscription email to:', email);
        
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

        console.log('Subscription email sent successfully');
        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error('Email error details:', {
            message: error.message,
            code: error.code,
            command: error.command
        });
        res.status(500).json({ 
            message: 'Failed to send confirmation email',
            error: error.message 
        });
    }
});

// Test route
router.get('/test-email', async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'Test Email',
            text: 'If you receive this, email sending is working!'
        });
        res.status(200).json({ message: 'Test email sent successfully' });
    } catch (error) {
        console.error('Test email error:', error);
        res.status(500).json({ 
            message: 'Failed to send test email',
            error: error.message 
        });
    }
});

module.exports = router;