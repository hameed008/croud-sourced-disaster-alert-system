// models/Request.js

import mongoose from 'mongoose';
import requestSchema from './Request/schema.js';


// Import modular components
let Request;
const createRequestModel = async () => {

  // Apply methods, statics, middleware, and indexes
  //await import("./Request/methods.js").then((module) => module.default(requestSchema));
  await import("./Request/statics.js").then((module) => module.default(requestSchema));
  await import("./Request/middleware.js").then((module) => module.default(requestSchema));
  await import("./Request/indexes.js").then((module) => module.default(requestSchema));
  await import("./Request/virtual.js").then((module) => module.default(requestSchema));
  Request = mongoose.model('Request', requestSchema);

};

await createRequestModel()
export default Request;


// // models/Request.js
// const mongoose = require('mongoose');

// const requestSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: [true, 'Please specify request type'],
//     enum: [
//       'Food',
//       'Water',
//       'Medical Supplies',
//       'Shelter',
//       'Transportation',
//       'Clothing',
//       'Other'
//     ]
//   },
//   quantity: {
//     type: Number,
//     required: [true, 'Please specify quantity needed'],
//     min: [1, 'Quantity must be at least 1']
//   },
//   description: {
//     type: String,
//     maxlength: [500, 'Description cannot exceed 500 characters']
//   },
//   location: {
//     type: {
//       type: String,
//       default: 'Point',
//       enum: ['Point']
//     },
//     coordinates: [Number], // [longitude, latitude]
//     required: [true, 'Location is required']
//   },
//   urgency: {
//     type: String,
//     enum: ['Low', 'Medium', 'High'],
//     default: 'Medium'
//   },
//   status: {
//     type: String,
//     enum: ['Pending', 'In Progress', 'Fulfilled', 'Expired'],
//     default: 'Pending'
//   },
//   requestedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: [true, 'Request must belong to a user']
//   },
//   fulfilledBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User'
//   },
//   relatedIncident: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Report'
//   },
//   deadline: {
//     type: Date,
//     validate: {
//       validator: function(v) {
//         return v > Date.now();
//       },
//       message: 'Deadline must be in the future'
//     }
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // Indexes
// requestSchema.index({ location: '2dsphere' });
// requestSchema.index({ status: 1 });
// requestSchema.index({ urgency: 1, createdAt: -1 });

// // Virtual for time remaining
// requestSchema.virtual('timeRemaining').get(function() {
//   if (!this.deadline) return null;
//   return Math.max(0, this.deadline - Date.now());
// });

// // Query middleware to populate user data
// requestSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'requestedBy',
//     select: 'name phone avatar'
//   }).populate({
//     path: 'fulfilledBy',
//     select: 'name phone avatar'
//   });
//   next();
// });

// // Static method to find nearby requests
// requestSchema.statics.findNearby = function(coordinates, maxDistance = 5000) {
//   return this.find({
//     location: {
//       $near: {
//         $geometry: {
//           type: 'Point',
//           coordinates
//         },
//         $maxDistance: maxDistance
//       }
//     },
//     status: 'Pending'
//   }).sort({ urgency: -1, createdAt: 1 });
// };

// const Request = mongoose.model('Request', requestSchema);

// module.exports = Request;