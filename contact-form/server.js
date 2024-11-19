require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the root directory and its subdirectories
app.use(express.static(path.join(__dirname, '..')));

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html')); // Adjusted for your structure
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer with environment variables
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Send to your email
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error submitting the form. Please try again.');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Form submitted successfully!');
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
