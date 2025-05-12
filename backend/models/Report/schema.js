import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function (v) {
          return v.length === 2 &&
            v[0] >= -180 && v[0] <= 180 &&
            v[1] >= -90 && v[1] <= 90;
        },
        message: 'Invalid coordinates'
      }
    },
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
  },
  disasterType: {
    type: String,
    required: true,
    enum: [
      'Flood', 'Earthquake', 'Wildfire', 'Hurricane',
      'Tornado', 'Landslide', 'Tsunami', 'Drought', 'Other'
    ]
  },
  severity: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  images: [{ url: String, caption: String }],
  video: String,
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verified: { type: Boolean, default: false },
  verificationNotes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: String,
    timestamp: Date
  }],
  status: {
    type: String,
    enum: ['Active', 'Contained', 'Resolved'],
    default: 'Active'
  },
  affectedRadius: {
    type: Number,
    default: 5000, // ✅ Default to 5km for nearby SMS alerts
    min: [100, 'Radius must be at least 100 meters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


export default reportSchema;


////////////////////////////////////////////////////////
// // models/Report/schema.js

// import mongoose from 'mongoose';
// //import geocoder from '../utils/geocoder'; // For address geocoding

// const reportSchema = new mongoose.Schema({
// location: {
//   type: {
//     type: String,
//     enum: ['Point'],
//     required: true
//   },
//   coordinates: {
//     type: [Number],
//     required: true,
//     validate: {
//       validator: function (v) {
//         return v.length === 2 &&
//           v[0] >= -180 && v[0] <= 180 &&
//           v[1] >= -90 && v[1] <= 90;
//       },
//       message: 'Invalid coordinates'
//     }
//   },
//   address: String
// },
//   disasterType: {
//     type: String,
//     required: [true, 'Please specify disaster type'],
//     enum: [
//       'Flood',
//       'Earthquake',
//       'Wildfire',
//       'Hurricane',
//       'Tornado',
//       'Landslide',
//       'Tsunami',
//       'Drought',
//       'Other'
//     ]
//   },
//   severity: {
//     type: String,
//     required: true,
//     enum: ['Low', 'Medium', 'High'],
//     default: 'Medium'
//   },
//   description: {
//     type: String,
//     maxlength: [1000, 'Description cannot exceed 1000 characters']
//   },
//   images: [{
//     url: String,
//     caption: String
//   }],
//   video: String,      // Video URL
//   reportedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   verified: {
//     type: Boolean,
//     default: false
//   },
//   verificationNotes: [{
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     note: String,
//     timestamp: Date
//   }],
//   status: {
//     type: String,
//     enum: ['Active', 'Contained', 'Resolved'],
//     default: 'Active'
//   },
//   affectedRadius: { // In meters
//     type: Number,
//     min: [0, 'Radius cannot be negative']
//   }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// export default reportSchema



////////////////////////////////////////////////
// // Geospatial Index
// reportSchema.index({ location: '2dsphere' });

// // Compound Index for common queries
// reportSchema.index({ disasterType: 1, severity: -1, createdAt: -1 });

// // Geocode address before saving (optional)
// reportSchema.pre('save', async function(next) {
//   if (this.isModified('address') && this.address) {
//     const loc = await geocoder.geocode(this.address);
//     this.location = {
//       type: 'Point',
//       coordinates: [loc[0].longitude, loc[0].latitude],
//       address: loc[0].formattedAddress
//     };
//   }
//   next();
// });

// // Virtual Population of Related Data
// reportSchema.virtual('requests', {
//   ref: 'Request',
//   localField: '_id',
//   foreignField: 'relatedIncident'
// });

// // Virtual for Duration
// reportSchema.virtual('duration').get(function() {
//   return Date.now() - this.createdAt;
// });

// // Static Methods
// reportSchema.statics.findNearby = function(coordinates, maxDistance = 5000) {
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
//     status: 'Active'
//   }).sort({ severity: -1, createdAt: 1 });
// };

// // Query Middleware
// reportSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'reportedBy',
//     select: 'name role verified'
//   });
//   next();
// });

// const Report = mongoose.model('Report', reportSchema);

// module.exports = Report;