const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Email User:', process.env.EMAIL_USER);
console.log('Email Pass is set:', !!process.env.EMAIL_PASS);

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

transporter.verify(function(error, success) {
  if (error) {
    console.log('Transporter error:', error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = transporter;