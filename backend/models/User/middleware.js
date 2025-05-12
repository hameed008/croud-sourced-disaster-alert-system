// models/User/middleware.js

import bcrypt from 'bcryptjs';

export default (schema) => {
  schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
};