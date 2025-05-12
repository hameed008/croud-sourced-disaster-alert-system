import Report from '../models/Report.js';
import { sendEmail } from '../utils/email/sendEmail.js';
import { reportConfirmationEmail } from '../utils/email/templates.js';
import { uploadFileOnCloudinary, deletFileFromCloudinary } from '../config/cloudinary.js';
import { notifyNearbyUsers } from '../utils/notifyUser.js';
import { getIO } from '../config/socket.js';
import Alert from '../models/Alert.js';
import fs from 'fs'

// @desc Create a new disaster report
// @route POST /api/reports
// @access Private (Authenticated Users)
export const createReport = async (req, res) => {
  try {
    const { video, location: locationString, address: addressString, disasterType, severity, description } = req.body;

    // Parse location and address from JSON string to Object
    const location = JSON.parse(locationString);
    const address = JSON.parse(addressString);

    let images = [];

    //✅ Upload images if provided
    if (req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadFileOnCloudinary(file.path));
      const uploadResults = await Promise.all(uploadPromises);

      // Delete files from local storage
      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      })

      images = uploadResults.map(file => ({
        public_id: file.public_id,
        url: file.secure_url
      }));
    }

    // ✅ Upload video if provided
    // if (req.files?.video?.length > 0) {
    //   const uploadedVideo = await uploadFileOnCloudinary(req.files.video[0].path);
    //   video = {
    //     public_id: uploadedVideo.public_id,
    //     url: uploadedVideo.secure_url
    //   };
    // }


    const newReport = new Report({
      location,
      address,
      disasterType,
      severity,
      description,
      images,
      video,
      reportedBy: req.user.id,
    });

    // Save Report
    await newReport.save();

    // Send email and notifications AFTER saving but BEFORE sending response
    try {
      // Send Report Created Confirmation Mail to user
      await sendEmail({
        to: req.user.email, // Changed from undefined 'email' to req.user.email
        subject: "✅ Your Disaster Report Has Been Registered",
        html: reportConfirmationEmail(newReport)
      });

      // Notify Near By Users
      const nearbyUsers = await notifyNearbyUsers(
        location.coordinates[0],
        location.coordinates[1],
        newReport,
        10000
      );

      // Send Real Time Reports to website 
      const io = getIO();
      io.emit("new-alert", newReport);
      //console.log('new report')

      if (nearbyUsers.length > 0) {
        for (const user of nearbyUsers) {
          await Alert.create({
            userId: user._id,
            disasterType: newReport.disasterType,
            location: newReport.location,
            address: newReport.address
          });
        }
      }
    } catch (notificationError) {
      console.error("Notification failed:", notificationError);
      // Continue even if notifications fail
    }

    // SINGLE response sent after all operations complete
    res.status(201).json({
      success: true,
      message: 'Report submitted successfully',
      report: newReport
    });

  } catch (error) {
    // SINGLE error response
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// export const createReport = async (req, res) => {
//   try {
//     const { video, location: locationString, address: addressString, disasterType, severity, description } = req.body;

//     // Parse location and address from JSON string to Object
//     const location = JSON.parse(locationString);
//     const address = JSON.parse(addressString);
//     //console.log(location)

//     let images = [];
//     // let video = "";

//     // ✅ Upload images if provided
//     if (req.files.length > 0) {
//       const uploadPromises = req.files.map(file => uploadFileOnCloudinary(file.path));
//       const uploadResults = await Promise.all(uploadPromises);

//       // Delete files from local storage
//       req.files.forEach((file) => {
//         fs.unlinkSync(file.path);
//       })

//       images = uploadResults.map(file => ({
//         public_id: file.public_id,
//         url: file.secure_url
//       }));
//     }

//     // ✅ Upload video if provided
//     // if (req.files?.video?.length > 0) {
//     //   const uploadedVideo = await uploadFileOnCloudinary(req.files.video[0].path);
//     //   video = {
//     //     public_id: uploadedVideo.public_id,
//     //     url: uploadedVideo.secure_url
//     //   };
//     // }

//     const newReport = new Report({
//       location,
//       address,
//       disasterType,
//       severity,
//       description,
//       images,
//       video,
//       reportedBy: req.user.id, // Assuming user is authenticated
//     });


//     // Save Report
//     await newReport.save();
//     res.status(201).json({ success: true, message: 'Report submitted successfully', report: newReport });

//     // Send Report Created Confirmation Mail to user:
//     await sendEmail({
//       to: email,
//       subject: "✅ Your Disaster Report Has Been Registered",
//       html: reportConfirmationEmail(newReport)
//     });


//     // Notify Near By Users
//     const nearbyUsers = await notifyNearbyUsers(location.coordinates[0], location.coordinates[1], newReport, 5000);

//     // Send Real Time Reports to website 
//     const io = getIO();
//     io.emit("new-alert", newReport); // send real-time alert to all


//     console.log(nearbyUsers.length)

//     if (nearbyUsers.length > 0) {
//       // console.log('yes');
//       for (const user of nearbyUsers) {
//         await Alert.create({
//           userId: user._id,
//           disasterType: newReport.disasterType,
//           location: newReport.location,
//           address: newReport.address
//         });

//         // if (user.socketId) {
//         //   io.to(user.socketId).emit("new-alert", newReport);
//         //   console.log(`Alert sent to user ${user.email}`);
//         // } else {
//         //   console.warn(`No socketId for user ${user.email} (${user._id})`);
//         // }
//         // console.log('done');
//       }
//     }

//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error: error.message });
//   }
// };

// @desc Get all disaster reports
// @route GET /api/reports
// @access Public
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().populate('reportedBy', 'name email');
    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc Get a single disaster report by ID
// @route GET /api/reports/:id
// @access Public
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id).populate('reportedBy', 'name email');

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc Update a disaster report
// @route PUT /api/reports/:id
// @access Private (Only Report Creator or Admin)
export const updateReport = async (req, res) => {
  try {
    const { location, disasterType, severity, description, images, video, status } = req.body;

    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    // Update fields if provided
    if (location) report.location = location;
    if (disasterType) report.disasterType = disasterType;
    if (severity) report.severity = severity;
    if (description) report.description = description;
    if (images) report.images = images;
    if (video) report.video = video;
    if (status) report.status = status;

    await report.save();
    res.status(200).json({ success: true, message: 'Report updated successfully', report: report });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc Delete a disaster report
// @route DELETE /api/reports/:id
// @access Private (Only Report Creator or Admin)
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    await report.deleteOne();
    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};


// @desc Verify a disaster report

export const verifyReport = async (req, res) => {
  const { reportId } = req.params;

  try {
    const report = await Report.findByIdAndUpdate(reportId, { verified: true }, { new: true }).populate('reportedBy');

    // Send SMS to the user
    const userPhone = report.reportedBy.phone;
    const msg = `✅ Your report for ${report.disasterType} has been verified. Help is being coordinated.`;

    if (userPhone) await sendSMS(userPhone, msg);

    res.json({ success: true, message: "Report verified and SMS sent." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
