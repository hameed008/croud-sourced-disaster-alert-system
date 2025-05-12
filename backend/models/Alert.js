
import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  disasterType: String,
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true
    }
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
  isRead: { type: Boolean, default: false },
  isCleared: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", alertSchema);
