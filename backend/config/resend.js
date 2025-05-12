import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  console.log(to, subject, html)
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

    console.log('Email sent:', data?.id); // ✅ Show ID
    return { success: true, message: 'Email sent', id: data?.id };
  } catch (err) {
    console.error('Unexpected error:', err);
    return { success: false, message: 'Unexpected error' };
  }
};


// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async (to, subject, html) => {
//   try {
//     const response = await resend.emails.send({
//       from: 'ResQMap Alerts <notify@onresend.dev>',
//       to,
//       subject,
//       html,
//     });

//     console.log('Email sent:', response.id);
//     return response;
//   } catch (err) {
//     console.error('Resend error:', err.message);
//   }
// };


//* we can also use above code as
//? configure in config/resend.js
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export default resend;

//? use in  utils/sendEmail.js
// import resend from '../config/resend.js';

// export const sendEmail = async (to, subject, html) => {
//   return await resend.emails.send({
//     from: process.env.RESEND_FROM,
//     to,
//     subject,
//     html
//   });
// };

// but since the code is very less that's why we using here only.


///////////////////////////////////////////
// import { Resend } from 'resend';

// const resend = new Resend('re_d8Jkxe8P_PXBvmHcoKdAfvaT6i9apjmAy');

// resend.emails.send({
//   from: 'onboarding@resend.dev',
//   to: 'khanhameed989@gmail.com',
//   subject: 'Hello World',
//   html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
// });