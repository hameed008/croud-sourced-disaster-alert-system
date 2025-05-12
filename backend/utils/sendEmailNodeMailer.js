import transporter from '../config/nodemailer.js';

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return info;
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    throw err;
  }
};
