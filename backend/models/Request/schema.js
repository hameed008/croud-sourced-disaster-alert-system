import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please specify request type'],
    enum: [
      'Food',
      'Water',
      'Medical Supplies',
      'Shelter',
      'Transportation',
      'Clothing',
      'Other'
    ]
  },
  quantity: {
    type: Number,
    required: [true, 'Please specify quantity needed'],
    min: [1, 'Quantity must be at least 1']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: [true, 'Location is required']
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
      type: String
    },
    zipCode: {
      type: String,
      required: true
    },
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Fulfilled', 'Expired'],
    default: 'Pending'
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Request must belong to a user']
  },
  fulfilledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  relatedIncident: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  },
  deadline: {
    type: Date,
    validate: {
      validator: function (v) {
        return v > Date.now();
      },
      message: 'Deadline must be in the future'
    }
  },

  // ✅ NEW FIELDS for messaging
  smsNotified: {
    type: Boolean,
    default: false
  },
  emailNotified: {
    type: Boolean,
    default: false
  },
  fulfilledAt: {
    type: Date
  },

  // Optional: history of notifications
  notifications: [
    {
      type: { type: String, enum: ['sms', 'email'] },
      sentAt: Date,
      status: String
    }
  ]
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

// Add geospatial index
requestSchema.index({ location: '2dsphere' });

export default requestSchema;




// // models/Request/schema.js
// import mongoose from 'mongoose';

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
//     coordinates: {
//       type: [Number], // [longitude, latitude]
//       required: [true, 'Location is required']
//     },
//     address: String
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
//       validator: function (v) {
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

// export default requestSchema;


/////////////////////////////////////////////////////
// const requestSchema = new mongoose.Schema({
//   type: { /* ... */ },
//   quantity: { /* ... */ },
//   description: { /* ... */ },
//   location: { /* ... */ },
//   urgency: { /* ... */ },
//   status: { /* ... */ },
//   requestedBy: { /* ... */ },
//   fulfilledBy: { /* ... */ },
//   relatedIncident: { /* ... */ },
//   deadline: { /* ... */ }
// }, {
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// module.exports = requestSchema;