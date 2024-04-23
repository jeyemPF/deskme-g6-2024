import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"; 
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import desksRoute from "./routes/desks.js";
import reservationsRoute from "./routes/reservations.js";
import cookieParser from "cookie-parser";

const app = express();

// Enable CORS
app.use(cors());

dotenv.config();

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
