

import React, { useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from "../contexts/NotifactionContext";

const url = import.meta.env.VITE_REACT_APP_API_URL
//const url = import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL


const NotificationTab = () => {
  // const [alerts, setAlerts] = useState([]);
  const { user } = useAuth()
  const { alerts, setAlerts, fetchAllAlerts } = useNotification()

  // Fetch All Alerts
  useEffect(() => {
    fetchAllAlerts(user._id)
  }, [user?._id]);


  const handleMarkAsRead = async (alertId) => {

    // 2. Update frontend state (change `read` to true for this alert)
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert._id === alertId ? { ...alert, isRead: true } : alert
      )
    );
    try {

      // 1. Update backend
      await axios.post(`${url}/alerts/mark-as-read/${alertId}`);

    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const clearAll = async () => {
    setAlerts([]);

    try {
      // 1. Update backend
      const alerts = await axios.post(`${url}/alerts/clear-all/`);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" bg-amber-50 rounded-md p-4 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg md:text-xl font-bold">Notifications</h2>
        {alerts.length > 0 && (
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={clearAll}
          >
            Clear All
          </button>
        )}
      </div>
      {alerts.length === 0 ? (
        <p className="text-gray-500">No alerts yet</p>
      ) : (
        <ul className="space-y-2">
          {alerts.map((alert, i) => (
            <li
              key={i}
              className={`p-2 rounded border-l-4 ${alert.isRead
                ? "bg-gray-100 border-gray-400 text-gray-700"
                : "bg-red-100 border-red-500 text-red-800"
                }`}
            >
              <div className="flex justify-between items-center">
                <span>
                  🚨 <strong>{alert.disasterType}</strong> in{" "}
                  <strong>{alert.locationName || "your area"}</strong>
                </span>
                {!alert.read && (
                  <button
                    className="text-xs text-blue-600 hover:underline ml-2"
                    onClick={() => handleMarkAsRead(alert._id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationTab;






// import { useContext, useState, useEffect } from 'react';
// import { SocketContext } from '../contexts/SocketContext';
// import axios from 'axios';
// import { useAuth } from '../contexts/AuthContext';

// const NotificationTab = () => {
//   const [alerts, setAlerts] = useState([]);
//   const { user } = useAuth()

//   useEffect(() => {

//     // Fetch initial alerts
//     const fetchAlerts = async () => {
//       const res = await axios.get(`http://localhost:8000/api/alerts/my-alerts/${user._id}`);
//       setAlerts(res.data);
//     };
//     fetchAlerts();
//   });


//   return (
//     <div className="p-4 bg-white shadow-md rounded-md">
//       <h2 className="text-lg font-semibold mb-2">📢 Notifications</h2>
//       {alerts.length === 0 ? (
//         <p>No alerts yet.</p>
//       ) : (
//         <ul>
//           {alerts.map((alert, index) => (
//             <li key={index} className="mb-2 p-2 bg-red-100 rounded">
//               <strong>{alert.disasterType}</strong> reported near {alert.locationName || 'your area'}.
//               <div className="text-sm text-gray-600">{new Date(alert.createdAt).toLocaleString()}</div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationTab;
