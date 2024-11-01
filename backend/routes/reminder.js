const express = require('express');
const router = express.Router();
const transporter = require('../config/emailConfig');

router.post('/send-reminder', async (req, res) => {
    console.log('🔵 New reminder request received');
    
    const { userEmail, productDetails } = req.body;
    console.log('📧 Email:', userEmail);
    console.log('📦 Product Details:', productDetails);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Auction Reminder',
        html: `
            <h1>Auction Reminder</h1>
            <p>You have added the following item to your reminders:</p>
            <div>
                <h2>${productDetails.name}</h2>
                <p>Brand: ${productDetails.brand}</p>
                <p>Starting Bid: $${productDetails.starting_bid}</p>
                <p>Auction End Time: ${productDetails.auction_end_time}</p>
            </div>
            <p>We'll notify you before the auction ends!</p>
        `
    };

    console.log('📨 Preparing to send email with options:', mailOptions);

    try {
        console.log('🚀 Attempting to send email...');
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully');
        res.status(200).json({ message: 'Reminder email sent successfully' });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        res.status(500).json({ message: 'Failed to send reminder email', error: error.message });
    }
});

module.exports = router;
