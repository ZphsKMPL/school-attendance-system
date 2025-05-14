const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Set up the transporter using your Gmail account credentials from the .env file
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // Your Gmail address
        pass: process.env.EMAIL_PASS   // Your Gmail password or App Password
    }
});

// Function to send OTP to email
function sendOtp(email, otp, callback) {
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender email (your Gmail address)
        to: email,                     // Recipient email (user's email)
        subject: 'Your OTP for School Attendance System',
        text: `Your OTP is: ${otp}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, info);
    });
}

module.exports = sendOtp;
