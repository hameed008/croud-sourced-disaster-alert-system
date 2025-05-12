// models/userHooks.js – Hashing Password Before Saving
import bcrypt from 'bcryptjs';

const applyUserHooks = (schema) => {
  // Hash password before saving
  schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
  });

  // Set passwordChangedAt field when password is modified
  schema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000; // Ensures token is generated after password change
    next();
  });
};

export default applyUserHooks;
