const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Checking email configuration...');
console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass is set:', !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    debug: true
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