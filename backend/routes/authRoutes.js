import express from 'express';
import passport from 'passport';
//import { updateNotificationPreferences } from '../controllers/userController.js';
import upload from '../middlewares/upload.js';
import {
  getVolunteers,
  register,
  verifyOTP,
  resendOtp,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateUser
} from '../controllers/authController.js';

// function test() {
//   console.log('hello')
// }
const router = express.Router();
router.get('/getVolunteers', getVolunteers)
router.post('/register', upload.single('profilePhoto'), register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOtp);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', passport.authenticate('jwt', { session: false }), getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/update-user/:id', upload.single('avatar'), updateUser)
//router.patch('/notifications', passport.authenticate('jwt', { session: false }), updateNotificationPreferences);

export default router;
