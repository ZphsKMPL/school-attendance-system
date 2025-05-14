import express from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import otpStore from '../utils/otpStore.js';
import pool from '../db.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  try {
    await transporter.sendMail({
      from: `"School Attendance System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, password, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (storedOtp !== otp) {
    return res.json({ success: false, message: 'Invalid OTP' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    otpStore.delete(email);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'User already exists or DB error' });
  }
});

export default router;
