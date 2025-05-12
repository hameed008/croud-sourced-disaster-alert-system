import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   const newSocket = io('http://localhost:8000');
  //   setSocket(newSocket);

  //   return () => newSocket.disconnect(); // Cleanup on unmount
  // }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};