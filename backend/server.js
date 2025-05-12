// Description: This file is the entry point of the application. It connects to the MongoDB database and starts the server. It also sets up the routes and socket.io for real-time updates.

// 1. Import the required modules.
import express, { urlencoded } from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import Razorpay from 'razorpay';

import connectDB from './config/db.js';
import passportConfig from './config/passport.js';
import { initSocket } from './config/socket.js';

import authRoutes from './routes/authRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import alertRoutes from './routes/alertRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'

//import paymentRoutes from "./routes/paymentRoutes.js";



// 2. Set the environment variables.
dotenv.config();
//cors({ origin: true });

const app = express();
const server = http.createServer(app); // wrap Express app with HTTP server


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
passportConfig(passport)
app.use(passport.initialize());


// Routes
// app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/alerts', alertRoutes)
app.use('/api/payment', paymentRoutes)


// Payment Routes
//app.use("/api/payments", paymentRoutes);

// MongoDB Connection
const DATABASE_NAME = process.env.DB_NAME
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
connectDB(DATABASE_NAME, USERNAME, PASSWORD);

// Init socket.io with HTTP server
initSocket(server);


// const PORT = process.env.PORT || 8000;
// const HOST = '0.0.0.0'; // Listen on all network interfaces (or use your local IP)

// // Start Server
// server.listen(PORT, HOST, () => {
//   console.log(`Server running on http://${HOST === '0.0.0.0' ? 'localhost' : HOST}:${PORT}`);
//   console.log(`Accessible on your local network at: http://YOUR_LOCAL_IP:${PORT}`);
// });


// Start Server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
