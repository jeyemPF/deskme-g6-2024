import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cloudinary from './config/cloudinary.js';

// Import routes
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import desksRoute from './routes/desks.js';
import reservationsRoute from './routes/reservations.js';
import switchsRoute from './routes/switchs.js';
import otpRoutes from './routes/otpRoutes.js';
import auditTrailsRoute from './routes/auditTrails.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', "https://deskme-g6-2024.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure CORS
const allowedOrigins = ['http://localhost:3000', "https://deskme-g6-2024.vercel.app"];
app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

// Middlewares
app.use(cookieParser());
app.use(express.json());

// Use routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/desks', desksRoute);
app.use('/api/reservations', reservationsRoute);
app.use('/api/switchs', switchsRoute);
app.use('/api/auditTrails', auditTrailsRoute);
app.use('/api/otp', otpRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong';
  console.error('Error:', errorMessage);
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Start the server
const port = process.env.PORT || 8800;
server.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}`);
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Export a handler for Vercel
export default function handler(req, res) {
  res.status(200).send('Server is running');
}

export { io };
