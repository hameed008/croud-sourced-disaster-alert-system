import React, { useEffect, useState } from "react";
import socket from "../sockets/socket";
import { useNotification } from "../contexts/NotifactionContext";
import { useAuth } from "../contexts/AuthContext";

const AlertBanner = () => {
  const [alert, setAlert] = useState(null);
  const { fetchAllAlerts } = useNotification();
  const { user, isLoggedIn } = useAuth()

  useEffect(() => {
    const handleNewAlert = (report) => {
      if (!report) return;

      setAlert(`${report.disasterType} reported in your area!`);
      //console.log('New alert received:', report);

      // Only fetch if logged in and report is relevant to user
      if (isLoggedIn && user?._id) {
        fetchAllAlerts(user._id);
      }

      // Clear timeout if it exists
      const timer = setTimeout(() => setAlert(null), 10000);
      return () => clearTimeout(timer);
    };

    // Track New Alert
    socket.on("new-alert", handleNewAlert);

    // Track Socket Connectio
    socket.on("connect", () => {
      // console.log("✅ Connected to Socket.IO:", socket.id);
    });

    return () => {
      socket.off("new-alert", handleNewAlert);
    };
  }, [isLoggedIn, user?._id]); // Add dependencies

  return alert ? (
    <div
      className={`bg-red-500 text-white text-center p-2 mt-20 rounded shadow-md transition-all duration-500 ease-out transform ${alert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 animate-bounce'
        }`}
    >
      {alert}
    </div>
  ) : null;
};

export default AlertBanner;
