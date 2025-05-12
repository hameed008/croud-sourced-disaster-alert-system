import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  // console.log(to, subject, html)
  try {
    const { data, error } = await resend.emails.send({
      from: 'ResQMap <alert@resqmap.hameedkhan.tech>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, message: error.message };
    }

    //console.log('Email sent:', data?.id); // ✅ Show ID
    return { success: true, message: 'Email sent', id: data?.id };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, message: 'Unexpected error' };
  }
};