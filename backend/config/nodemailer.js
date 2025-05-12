import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // or 'hotmail', or use host/port for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
