import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import desksRoute from "./routes/desks.js";
import reservationsRoute from "./routes/reservations.js";
import switchsRoute from "./routes/switchs.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "./config/cloudinary.js";


const app = express();

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// Dito 'yung mga p'wedeng mag-access ng backend
// URL ng frontend
const allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo DB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// Middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/desks", desksRoute);
app.use("/api/reservations", reservationsRoute);
app.use("/api/switchs", switchsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "parang may mali sa ginawa mo";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend!");
});
