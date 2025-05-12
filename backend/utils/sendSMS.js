import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

export const sendSMS = async (to, body) => {
  try {
    const message = await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log("✅ SMS sent:", message.sid);
    return message.sid;
  } catch (error) {
    console.error("❌ SMS failed:", err.message)
    throw error;
  }
};