const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

// Set up the transporter using your Gmail account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send OTP to email
function sendOtp(email, otp, callback) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for School Attendance System',
        text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return callback(error, null);
        }
        return callback(null, info);
    });
}

module.exports = sendOtp;
