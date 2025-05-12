import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number], // [lng, lat]
        required: true
      }
    },

    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    // phone: {
    //   type: String,
    //   required: [true, 'Please provide a phone number'],
    //   match: [/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Invalid phone number']
    // },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'volunteer'],
      default: 'user'
    },
    avatar: {
      // url: { type: String, default: 'https://i.imgur.com/8puTSd9.png' },
      url: { type: String },
      public_id: { type: String, default: '' }
    },

    // ✅ OTP & verification
    otp: {
      code: String,
      expiresAt: Date
    },
    verified: {
      type: Boolean,
      default: false
    },
    isPhoneVerified: {
      type: Boolean,
      default: false
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },

    // ✅ Preferences
    notificationPreferences: {
      sms: { type: Boolean, default: true },
      email: { type: Boolean, default: true }
    },

    // ✅ Preferences
    notificationPreferences: {
      sms: { type: Boolean, default: true },
      email: { type: Boolean, default: true }
    },

    // 🔐 Auth Support
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },

);

export default userSchema;
