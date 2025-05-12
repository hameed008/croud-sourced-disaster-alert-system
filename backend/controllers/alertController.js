import Alert from '../models/Alert.js';

export const getUnReadAlerts = async (req, res) => {
  // console.log(req.params.userId)
  try {
    const AllAlerts = await Alert.find({
      userId: req.params.userId,
      //   isRead: false  // Only include unread alerts
      isCleared: false
    }).sort({ createdAt: -1 });  // Newest first

    res.status(200).json({
      success: true,
      alerts: AllAlerts // Return only unread alerts
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch unread alerts",
      error: error.message
    });
  }
}

export const markAsRead = async (req, res) => {
  try {
    // 1. Mark the alert as read
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.alertId,
      { $set: { isRead: true } },
      { new: true }
    );

    if (!updatedAlert) {
      return res.status(404).json({
        success: false,
        message: "Alert not found"
      });
    }

    // 1. Fetch All alerts
    const AllAlerts = await Alert.find().sort({ createdAt: -1 });

    // 2. Fetch ONLY unread alerts (filtered)
    // const unreadAlerts = await Alert.find({ isRead: false }).sort({ createdAt: -1 });


    // res.status(200).json({
    //   success: true,
    //   alerts: AllAlerts // Return only unread alerts
    // });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}


export const clearAllAlerts = async (req, res) => {
  try {
    // 1. Update ALL alerts in the database
    await Alert.updateMany(
      {}, // Empty filter = apply to all documents
      {
        $set: {
          isCleared: true,
          isRead: true
        }
      }
    );

    // 2. Return empty array (or fetch unread alerts if needed)
    res.status(200).json({
      success: true,
      alerts: [] // Return empty array as per your requirement
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
}