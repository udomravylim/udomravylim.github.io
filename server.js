require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing form data and compressing responses
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// Serve static files from the public directory with caching
app.use(express.static('public', { maxAge: '1d' }));

// Serve index.html on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle contact form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Send immediate response to client
    res.status(200).send('Your message is being sent.');

    // Handle email sending in the background
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Message sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
