import { sendEmail } from "./email/sendEmail.js";
import { reportNotificationEmail } from "./email/templates.js";
import User from '../models/User.js';
// Notify near by user via email
export const notifyNearbyUsers = async (lng, lat, report, radius = 5000) => {
  //console.log(lng, lat, report, radius)
  const users = await User.find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [lng, lat] },
        $maxDistance: radius
      }
    }
  });

  console.log(users)

  for (const user of users) {
    await sendEmail({
      to: user.email,
      subject: "🚨 Alert: Disaster near you!",
      html: reportNotificationEmail(report)
    });
  }

  return users;
};
