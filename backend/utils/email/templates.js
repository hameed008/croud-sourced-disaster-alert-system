// utils/templates.js

export const registrationEmail = (name) => `
 <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h2 style="text-align: center;">
      Welcome to <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>, ${name}!
    </h2>
    <p>We're thrilled to have you here! With ResQMap, you can:</p>
    <ul style="padding-left: 20px;">
      <li>📍 Report disasters with location accuracy</li>
      <li>🆘 Request help or resources instantly</li>
      <li>🛰️ Stay updated with real-time alerts</li>
    </ul>
    <div style="text-align: center; margin: 20px 0;">
      <a href="https://resqmap.hameedkhan.in" style="background-color: #03BD62; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none;">🚀 Get Started</a>
    </div>
    <p style="color: gray;">Together, we make disaster response faster and better. Stay safe!</p>
    <p>— Team <strong>ResQMap</strong></p>
  </div>
`;

// export const reportConfirmationEmail = (report) => `
//   <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
//     <img src="https://croud-sourced-disaster-alert-system-396s.vercel.app/assets/logo-BIq3T4Wb.svg" alt="Logo" style="width: 100px; margin-bottom: 20px;" />
//     <h2 style="color: #3b82f6;">📝 Report Received</h2>
//     <p>Hi there,</p>
//     <p>Thank you for submitting a disaster report. We've received the following details:</p>

//     <ul style="list-style: none; padding: 0;">
//       <li><strong>Type:</strong> ${report.disasterType}</li>
//       <li><strong>Location:</strong> ${report.address.city}</li>
//       <li><strong>Severity:</strong> ${report.severity}</li>
//       <li><strong>Description:</strong> ${report.description}</li>
//     </ul>

//     <p>🔍 Our team will verify the report shortly. Once verified, relevant users in the area will be notified.</p>

//     <p style="margin-top: 20px;">Thank you for helping us keep the community safe.<br><strong>Your App Team</strong></p>
//   </div>
// `;

export const reportConfirmationEmail = (report) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h2 style="text-align: center;">
      📝 Report Received - <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>
    </h2>
    <p>Hi there,</p>
    <p>Thank you for submitting a disaster report. Here are the details we received:</p>

    <ul style="list-style: none; padding: 0;">
      <li><strong>📌 Type:</strong> ${report.disasterType}</li>
      <li><strong>📍 Location:</strong> ${report.address.city}</li>
      <li><strong>⚠️ Severity:</strong> ${report.severity}</li>
      <li><strong>📝 Description:</strong> ${report.description}</li>
    </ul>

    <p>✅ Our team will verify this report shortly. Nearby users will be alerted after confirmation.</p>

    <p style="color: gray;">We appreciate your contribution to making our community safer.</p>

    <p>— Team <strong>ResQMap</strong></p>
  </div>
`;



// export const resourceRequestConfirmationEmail = (request) => `
//   <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
//     <img src="https://croud-sourced-disaster-alert-system-396s.vercel.app/assets/logo-BIq3T4Wb.svg" alt="Logo" style="width: 100px; margin-bottom: 20px;" />
//     <h2 style="color: #10b981;">📦 Resource Request Received</h2>
//     <p>Hi there,</p>
//     <p>Thank you for submitting a resource request. We've received the following details:</p>

//     <ul style="list-style: none; padding: 0;">
//       <li><strong>Type:</strong> ${request.type}</li>
//       <li><strong>Quantity:</strong> ${request.quantity}</li>
//        <li><strong>Urgency:</strong> ${request.urgency}</li>
//       <li><strong>Location:</strong> ${request.address.city}</li>
//       <li><strong>Description:</strong> ${request.description}</li>
//     </ul>

//     <p>⏳ Our team will verify your request and notify you once assistance is arranged.</p>

//     <p style="margin-top: 20px;">Thank you for trusting us in difficult times.<br><strong>Your RESQMAP Team</strong></p>
//   </div>
// `;


export const resourceRequestConfirmationEmail = (request) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h2 style="text-align: center;">
      📦 Resource Request Received - 
      <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>
    </h2>
    <p>Hi there,</p>
    <p>We’ve received your request for emergency resources with the following details:</p>

    <ul style="list-style: none; padding: 0;">
      <li><strong>🛠 Type:</strong> ${request.type}</li>
      <li><strong>🔢 Quantity:</strong> ${request.quantity}</li>
      <li><strong>⚠️ Urgency:</strong> ${request.urgency}</li>
      <li><strong>📍 Location:</strong> ${request.address.city}</li>
      <li><strong>📝 Description:</strong> ${request.description}</li>
    </ul>

    <p>⏳ Our team is reviewing your request and will coordinate resources soon.</p>

    <p style="color: gray;">We’re here to support you—stay strong and safe.</p>

    <p>— Team <strong>ResQMap</strong></p>
  </div>
`;



export const reportNotificationEmail = (report) => `
<div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h3 style="text-align: center;">
      🚨 New Disaster Reported - 
      <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>
    </h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>🌪️ Type:</strong> ${report.disasterType}</li>
      <li><strong>📍 Location:</strong> ${report.address.city}, ${report.address.state}</li>
      <li><strong>⚠️ Severity:</strong> ${report.severity}</li>
      <li><strong>📝 Description:</strong> ${report.description}</li>
    </ul>
    <p style="margin-top: 20px;">Stay alert and help spread the word to nearby users.</p>
  </div>
`;


export const requestNotificationEmail = (request) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h3 style="text-align: center;">
      🆘 New Resource Request - 
      <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>
    </h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>🌍 Type:</strong> ${request.type}</li>
      <li><strong>⚠️ Urgency:</strong> ${request.urgency}</li>
      <li><strong>📍 Location:</strong> ${request.address.city}, ${request.address.state}</li>
      <li><strong>📝 Description:</strong> ${request.description}</li>
    </ul>
    <p style="margin-top: 20px;">Please assist the affected individuals and share the request with nearby users.</p>
  </div>
`;


// export const otpEmail = (code) => `
//   <div style="font-family:sans-serif; padding: 20px;">
//     <h2>Your OTP Code</h2>
//     <p>Use the code below to verify your email:</p>
//     <h1 style="letter-spacing: 5px;">${code}</h1>
//     <p>This OTP will expire in 10 minutes.</p>
//   </div>
// `;

// export const otpEmail = (code) => `
//   <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; border border-radius: 8px;">
//     <div style="text-align: center; padding: 15px; border: 1px solid #e5e7eb; border-radius: 8px; width: fit-content; margin: 0 auto 20px auto; background-color: #ffffff;">
//       <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
//     </div>
//     <h2 style="color: #10b981;">👋 Welcome to Our Platform 
//       <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>!
//     </h2>
//     <p style="font-size: 16px;">Thank you for signing up. Please use the OTP below to verify your email address:</p>
//     <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border: 1px dashed #f59e0b; border-radius: 5px; text-align: center;">
//       <h1 style="font-size: 28px; letter-spacing: 6px; color: #b45309;">${code}</h1>
//     </div>
//     <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
//     <p style="margin-top: 20px;">Regards,<br><strong>Your App Team</strong></p>
//   </div>
// `;

export const otpEmail = (code) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h2>👋 Welcome to Our Platform 
      <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span> !
    </h2>
    <p style="font-size: 16px;">Thank you for signing up. Please use the OTP below to verify your email address:</p>
    <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border: 1px dashed #f59e0b; border-radius: 5px; text-align: center;">
      <h1 style="font-size: 28px; letter-spacing: 6px; color: #b45309;">${code}</h1>
    </div>
    <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
    <p style="margin-top: 20px;">Regards,<br><strong>RESQMAP Team</strong></p>
  </div>
`;


// export const resendOtpEmail = (code) => `
//   <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
//     <img src="https://croud-sourced-disaster-alert-system-396s.vercel.app/assets/logo-BIq3T4Wb.svg" alt="Logo" style="width: 100px; margin-bottom: 20px;" />
//     <h2 style="color: #10b981;">🔁 OTP Resent - RESQMAP</h2>
//     <p style="font-size: 16px;">You requested a new OTP. Please use the code below to verify your email:</p>
//     <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border: 1px dashed #f59e0b; border-radius: 5px; text-align: center;">
//       <h1 style="font-size: 28px; letter-spacing: 6px; color: #b45309;">${code}</h1>
//     </div>
//     <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
//     <p style="margin-top: 20px;">Regards,<br><strong>Your App Team</strong></p>
//   </div>
// `;

export const resendOtpEmail = (code) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="Logo" style="width: 60px;" />
    </div>
    <h2>🔁 OTP Resent - 
      <span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span>
    </h2>
    <p style="font-size: 16px;">You requested a new OTP. Please use the code below to verify your email:</p>
    <div style="margin: 20px 0; padding: 15px; background-color: #fef3c7; border: 1px dashed #f59e0b; border-radius: 5px; text-align: center;">
      <h1 style="font-size: 28px; letter-spacing: 6px; color: #b45309;">${code}</h1>
    </div>
    <p style="font-size: 14px; color: #6b7280;">This code will expire in 10 minutes.</p>
    <p style="margin-top: 20px;">Regards,<br><strong>RESQMAP Team</strong></p>
  </div>
`;

export const resetPasswordEmail = (resetURL) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
    <div style="text-align: center;">
      <img src="https://res.cloudinary.com/dxu8oilmr/image/upload/f_auto,q_auto/v1/Image%20Store/b50inm27goxt6kaepiiw" alt="ResQMap Logo" style="width: 100px; margin-bottom: 20px;" />
    </div>
    <h2 style="text-align: center; color: #ef4444;">🔒 Reset Your Password</h2>
    <p>Hello,</p>
    <p>We received a request to reset your password for 
      <strong><span style="color: #03BD62;">RES</span><span style="color: #8C52FF;">Q</span><span style="color: #FF3131;">MAP</span></strong>.
    </p>
    <p>Please click the button below to reset it:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${resetURL}" style="padding: 10px 20px; background-color: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
    </div>
    <p>If the button doesn't work, copy and paste this URL into your browser:</p>
    <p style="word-break: break-all;"><a href="${resetURL}">${resetURL}</a></p>
    <p style="color: gray;">If you didn't request a password reset, you can ignore this email.</p>
    <p style="margin-top: 20px;">Stay safe,<br><strong>RESQMAP Team</strong></p>
  </div>
`;
