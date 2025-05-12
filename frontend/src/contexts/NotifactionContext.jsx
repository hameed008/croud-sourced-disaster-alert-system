import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_REACT_APP_API_URL
//const url = import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL;

// 1. Separate context creation
const NotificationContext = createContext();

// 2. Proper component export
export const NotificationProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const fetchAllAlerts = async (userId) => {
    //console.log('enter')
    try {
      const res = await axios.get(`${url}/alerts/my-alerts/${userId}`);
      setAlerts(res.data.alerts || []);
      // console.log('fetched')
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
      setAlerts([]);
    }
  };

  return (
    <NotificationContext.Provider value={{ alerts, setAlerts, fetchAllAlerts }}>
      {children}
    </NotificationContext.Provider>
  );
};

// 3. Separate hook export
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// 4. Named export for context (optional)
export { NotificationContext };



// import { createContext, useContext, useState, } from 'react';
// import axios from 'axios';

// //const url = import.meta.env.VITE_REACT_APP_API_URL
// const url = import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL

// export const NotificationContext = createContext();
// export const NotificationProvider = ({ children }) => {
//   const [alerts, setAlerts] = useState([]);


//   const fetchAllAlerts = async (userId) => {
//     const res = await axios.get(`${url}/alerts/my-alerts/${userId}`);
//     setAlerts(res.data.alerts || []);
//   }

//   return (
//     <NotificationContext.Provider value={{ alerts, setAlerts, fetchAllAlerts }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => useContext(NotificationContext);