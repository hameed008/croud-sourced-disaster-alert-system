// models/User.js

import mongoose from "mongoose";
import userSchema from "./User/schema.js";

// Function to apply methods and create the model
const createUserModel = async () => {
  // Apply methods, statics, middleware, and indexes
  await import("./User/methods.js").then((module) => module.default(userSchema));
  await import("./User/statics.js").then((module) => module.default(userSchema));
  await import("./User/middleware.js").then((module) => module.default(userSchema));
  await import("./User/indexes.js").then((module) => module.default(userSchema));

  // Log the schema methods to verify they are applied
  // console.log("User schema methods:", userSchema.methods);

  // Virtuals
  userSchema.virtual("reports", {
    ref: "Report",
    foreignField: "reportedBy",
    localField: "_id",
  });

  // Create and export the model
  const User = mongoose.model("User", userSchema);
  return User;
};

// Export the model after applying all methods
export default await createUserModel();


















// import mongoose from 'mongoose';
// import userSchema from './User/schema.js';

// // Import modular components using commonJs
// // require('./User/methods')(userSchema);
// // require('./User/statics')(userSchema);
// // require('./User/middleware')(userSchema);
// // require('./User/indexes')(userSchema);


// // Import modular components using ES6
// import('./User/methods.js').then((module) => module.default(userSchema));
// import('./User/statics.js').then((module) => module.default(userSchema));
// import('./User/middleware.js').then((module) => module.default(userSchema));
// import('./User/indexes.js').then((module) => module.default(userSchema));

// //Virtuals
// userSchema.virtual('reports', {
//   ref: 'Report',
//   foreignField: 'reportedBy',
//   localField: '_id'
// });

// // Create and export the model
// const User = mongoose.model("User", userSchema);
// export default User;









// // models/User.js – Mongoose Schema
// import mongoose from 'mongoose';
// import applyUserHooks from './userHooks.js';
// import applyUserMethods from './userMethods.js';

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Please provide a name'],
//       trim: true
//     },
//     email: {
//       type: String,
//       required: [true, 'Please provide an email'],
//       unique: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         'Please provide a valid email'
//       ]
//     },
//     password: {
//       type: String,
//       required: [true, 'Please provide a password'],
//       minlength: 6,
//       select: false
//     },
//     role: {
//       type: String,
//       enum: ['user', 'admin', 'volunteer'],
//       default: 'user'
//     },
//     avatar: {
//       type: String,
//       default: 'https://i.imgur.com/8puTSd9.png'
//     },
//     passwordChangedAt: Date,
//     passwordResetToken: String,
//     passwordResetExpires: Date
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// // Apply hooks and methods to the schema
// applyUserHooks(userSchema);
// applyUserMethods(userSchema);

// const User = mongoose.model('User', userSchema);
// export default User;
