const nodemailer = require('nodemailer');
require('dotenv').config(); // Make sure environment variables are loaded

const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services as well
    auth: {
        user: process.env.EMAIL_USER, // Email address from environment variables
        pass: process.env.EMAIL_PASS  // Email password from environment variables
    }
});

// Verify the configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

module.exports = transporter;