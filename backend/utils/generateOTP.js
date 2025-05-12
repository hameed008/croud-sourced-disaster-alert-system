// utils/generateOTP.js
export default function generateOTP(length = 6) {
  // console.log('otp')
  return Math.floor(100000 + Math.random() * 900000).toString();
}
