import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const applyUserMethods = (schema) => {
  // Compare entered password with hashed password
  schema.methods.correctPassword = async function (candidatePassword) {
    // console.log(candidatePassword, this.password)
    return await bcrypt.compare(candidatePassword, this.password);
  };

  // Check if user changed password after JWT was issued
  schema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
      return JWTTimestamp < changedTimestamp;
    }
    return false;
  };

  // Generate JWT token
  schema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
  };
};

export default applyUserMethods;