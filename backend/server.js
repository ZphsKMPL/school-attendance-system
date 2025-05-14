const express = require('express');
const bodyParser = require('body-parser');
const sendOtp = require('./otpSender');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory store for OTP (You can use a database later)
let otpStore = {};

// Route to send OTP to the email
app.post('/sendOtp', (req, res) => {
    const email = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000);  // Generate a random 6-digit OTP

    sendOtp(email, otp, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending OTP');
        }

        // Save OTP in memory (This should be done for a limited time)
        otpStore[email] = otp;

        res.status(200).send('OTP sent successfully!');
    });
});

// Route to verify OTP
app.post('/verifyOtp', (req, res) => {
    const email = req.body.email;
    const enteredOtp = req.body.otp;

    if (otpStore[email] === parseInt(enteredOtp)) {
        delete otpStore[email];  // Remove OTP after successful verification
        res.status(200).send('OTP verified successfully!');
    } else {
        res.status(400).send('Invalid OTP');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
