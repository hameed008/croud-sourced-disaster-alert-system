import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// Generate JWT Token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Verify JWT Token
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
