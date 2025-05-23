import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';
import crypto from 'crypto';
//import { sendEmail } from '../config/resend.js';
import { sendEmail } from '../utils/email/sendEmail.js';
import { otpEmail } from '../utils/email/templates.js';
import { resendOtpEmail } from '../utils/email/templates.js';
import { resetPasswordEmail } from '../utils/email/templates.js';
import { registrationEmail } from '../utils/email/templates.js';
import generateOTP from '../utils/generateOTP.js';
import { sendSMS } from '../utils/sendSMS.js';
import { uploadFileOnCloudinary, deletFileFromCloudinary } from '../config/cloudinary.js';
import fs from 'fs'

// const otpStore = new Map();

//@desc Get All Volunteers 
// @route POST /api/auth/getVolunteers
// @access Public
export const getVolunteers = async (req, res) => {
  try {

    const volunteers = await User.find({ role: 'volunteer' });
    res.status(200).json({ success: true, message: "", data: { volunteers } })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message })
  }
}


// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const register = async (req, res) => {
  //? Parse Before Destructuring
  /* // Parse FIRST
  const parsedBody = {
    ...req.body,
    location: JSON.parse(req.body.location)
  };

  // Then destructure
  const { location, name, email, password, role } = parsedBody;
  console.log(location); // Proper GeoJSON object
 */

  //? Direct Parsing
  // const { name, email, password, role } = req.body;
  // const location = JSON.parse(req.body.location); // Parse separately

  try {

    //? Safe Parsing (Recommended)
    const {
      name,
      email,
      password,
      role,
      location: locationString // Rename during destructure
    } = req.body;

    let location;
    try {
      location = JSON.parse(locationString || '{}');
    } catch (error) {
      location = { type: 'Point', coordinates: [0, 0] }; // Default fallback
    }


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    let avatar = {};
    if (req.file) {
      const { secure_url, public_id } = await uploadFileOnCloudinary(req.file.path);
      fs.unlinkSync(req.file.path)

      // Save image URL and public_id in avatar field
      avatar = {
        url: secure_url,
        public_id: public_id
      };
    } else {
      avatar = {
        url: '',
        public_id: ''
      };
    }

    // // Create new user
    const newUser = new User({
      avatar,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(location.coordinates[0]), // lng
          parseFloat(location.coordinates[1])  // lat
        ]
      },
      name,
      email,
      password,
      role
    });

    // Generate OTP
    const otp = generateOTP();
    newUser.otp = {
      code: otp,
      expiresAt: Date.now() + 10 * 60 * 1000 // valid for 10 mins
    };

    // Generate and store OTP
    // const otp = generateOTP();
    // otpStore.set(email, {
    //   code: otp,
    //   expiresAt: Date.now() + 10 * 60 * 1000,
    //   userData: { name, phone, email, password, role }
    // });

    //// Save User Data
    await newUser.save();

    // Send via SMS or email
    //await sendSMS(newUser.phone, `Your OTP is ${otp}`);
    if (newUser.notificationPreferences?.email) {
      await sendEmail({
        to: email,
        subject: "Verify your OTP",
        html: otpEmail(otp)
      });

      res.status(200).json({ success: true, message: "OTP sent successfully" });
    }


    // Send response to client
    // res.status(201).json({
    //   success: true,
    // message: 'User registered successfully',
    // user: {
    //   id: newUser._id,
    //   name: newUser.name,
    //   email: newUser.email,
    //   phone: newUser.phone,
    //   role: newUser.role
    // },
    // token
    //});

    // Send welcome email to user
    // if (newUser.notificationPreferences?.email) {
    //   await sendEmail({
    //     to: email,
    //     subject: "Welcome to ResQMap!",
    //     html: `<p>Hi ${name},</p><p>Thanks for registering on <strong>ResQMap</strong>.</p><p>Stay safe & alert! 🌍</p>`
    //   });
    // }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc Verify OTP
export const verifyOTP = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email }).select('+password');

  if (!user || user.otp.code !== code || Date.now() > user.otp.expiresAt) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.verified = true;
  user.isEmailVerified = true;
  user.otp = undefined;
  await user.save();

  // Generate JWT Token
  const token = generateToken(user._id);


  const name = user.name.split(" ")[0];
  if (user.notificationPreferences?.email) {
    await sendEmail({
      to: email,
      subject: `🎉 Welcome to ResQMap, ${name}! Let's make safety smarter together.`,
      html: registrationEmail(name)
    });
  }

  res.status(200).json({
    message: "OTP verified successfully",
    success: true,
    userData: {
      user
    },
    token
  });

};


// @desc Resend OTP
export const resendOtp = async (req, res) => {

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const newOTP = generateOTP();
  user.otp = {
    code: newOTP,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 min
  };
  await user.save();


  // Resend opt via mail
  if (user.notificationPreferences?.email) {
    await sendEmail({
      to: email,
      subject: "🔁 Your New OTP Code - RESQMAP Verification",
      html: resendOtpEmail(newOTP)
    });
  }

  // Send OTP via SMS/email
  // await sendSMS(user.phone, `Your new OTP is ${newOTP}`);

  res.status(200).json({ message: "OTP resent successfully" });
};


// @desc Login User
// @route POST /api/auth/login
// @access Public
export const login = async (req, res) => {

  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');


    // if (!user || !user.isEmailVerified) {
    //   return res.status(400).json({ message: 'Invalid email or password' });
    // }

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }



    // Validate password
    const isMatch = await user.correctPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      userData: {
        user
      },
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// @desc Logout User (Clear Cookie if using HTTP-only cookies)
// @route GET /api/auth/logout
// @access Private
export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc Check if token is valid
// @route GET /api/auth/me
// @access Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Check if token is valid
// @route Post /api/auth/updateUser
// @access Private

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body };

    // 1. Handle avatar update if file exists
    if (req.file) {
      // Find user first to get old avatar info
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Delete old avatar if exists
      if (user.avatar?.public_id) {
        try {
          await deletFileFromCloudinary(user.avatar.public_id);
        } catch (deleteError) {
          console.error('Error deleting old avatar:', deleteError);
          // Continue even if deletion fails
        }
      }

      // Upload new avatar
      try {
        const { secure_url, public_id } = await uploadFileOnCloudinary(req.file.path);
        updatedData.avatar = { url: secure_url, public_id };

        // Clean up temp file
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error('Error uploading new avatar:', uploadError);
        return res.status(500).json({
          success: false,
          message: 'Avatar upload failed'
        });
      }
    }

    // 2. Update user data
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: updatedUser
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: 'Update failed',
      error: error.message
    });
  }
};

//* Update User Method 2
// export const updateUser = async (req, res) => {
//   try {
//     // 1. Find the user
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     // 2. Handle avatar update if file exists
//     if (req.file) {
//       // Delete old avatar if exists
//       if (user.avatar?.public_id) {
//         try {
//           await deletFileFromCloudinary(user.avatar.public_id);
//         } catch (deleteError) {
//           console.error('Error deleting old avatar:', deleteError);
//           // Continue even if deletion fails
//         }
//       }

//       // Upload new avatar
//       const { secure_url, public_id } = await uploadFileOnCloudinary(req.file.path);

//       // Clean up temp file
//       try {
//         fs.unlinkSync(req.file.path);
//       } catch (unlinkError) {
//         console.error('Error deleting temp file:', unlinkError);
//       }

//       // Prepare avatar data
//       user.avatar = {
//         url: secure_url,
//         public_id: public_id
//       };
//     }

//     // 3. Update other fields
//     if (req.body.name) user.name = req.body.name;
//     if (req.body.email) user.email = req.body.email;

//     // 4. Save changes
//     const updatedUser = await user.save();

//     // 5. Return response
//     res.status(200).json({
//       success: true,
//       data: updatedUser
//     });

//   } catch (error) {
//     console.error('Update error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Internal Server Error', 
//       error: error.message 
//     });
//   }
// }

// @desc Forgot Password (Generate and Send Reset Token)
// @route POST /api/auth/forgot-password
// @access Public
export const forgotPassword = async (req, res) => {
  try {
    // console.log('yes')
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();


    const resetURL = `http://192.168.0.10:3000/reset-password/${resetToken}`;
    await sendEmail({
      to: user.email,
      subject: 'Reset Password',
      html: resetPasswordEmail(resetURL)
      //  html: `<p>Click here to reset password: <a href="${resetURL}">${resetURL}</a></p>`
    });


    // res.status(200).json({ message: 'Reset link sent to email' });

    res.status(200).json({
      success: true,
      message: 'Reset link sent to email',
      // resetToken // In real projects, send via email
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Reset Password
// @route POST /api/auth/reset-password/:token
// @access Public
export const resetPassword = async (req, res) => {

  const newPassword = req.body.password
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });


    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Set new password
    // const hashedPassword = await bcrypt.hash(req.body.password, 12); // handle by mongoose pre save function
    user.password = newPassword
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// // @ update Notification Preferences
// import User from '../models/User.js';

// export const updateNotificationPreferences = async (req, res) => {
//   try {
//     const { sms, email } = req.body;

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       {
//         notificationPreferences: {
//           sms: sms ?? true,
//           email: email ?? true
//         }
//       },
//       { new: true, runValidators: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Notification preferences updated",
//       preferences: user.notificationPreferences
//     });
//   } catch (err) {
//     console.error("Error updating preferences:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
