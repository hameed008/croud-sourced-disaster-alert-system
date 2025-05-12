import { io } from 'socket.io-client';

let socket;

const useSocket = () => {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    });
  }
  return socket;
};

export default useSocket;