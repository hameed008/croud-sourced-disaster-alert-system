// models/Report.js

import mongoose from 'mongoose';
import reportSchema from './Report/schema.js';

//console.log(reportSchema)
let Report;
const createReportModel = async () => {

  // Import modular components
  await import("./Report/statics.js").then((module) => module.default(reportSchema));
  //await import("./Report/middleware.js").then((module) => module.default(reportSchema));
  await import("./Report/indexes.js").then((module) => module.default(reportSchema));
  await import("./Report/virtual.js").then((module) => module.default(reportSchema));

  Report = mongoose.model('Report', reportSchema);

};

await createReportModel()
export default Report;

















// // Description: Model for Report collection in MongoDB. It defines the schema for a disaster report and exports the model.
// import mongoose from 'mongoose';

// const ReportSchema = new mongoose.Schema({
//   location: {
//     type: { lat: Number, lng: Number },
//     required: true,
//   },
//   disasterType: { type: String, required: true },
//   severity: { type: String, required: true },
//   description: String,
//   images: [String],  // Array of image URLs
//   video: String,      // Video URL
//   reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   timestamp: { type: Date, default: Date.now },
//   status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
// });

// export default mongoose.model('Report', ReportSchema);
