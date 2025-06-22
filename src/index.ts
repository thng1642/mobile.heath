import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import { Server, Socket } from "socket.io";
// Load environment variables before other imports
import { Server as Engine } from "engine.io";
import { createServer } from "node:http";
import routerHeartRate from "./routes/heart-rate.routes";
// const httpServer = createServer((req, res) => {
//   res.writeHead(404).end();
// });
// const engine = new Engine();

// engine.attach(httpServer, {
//   path: "/socket.io/"
// });
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const server = require("http").createServer(app);
// io.bind(engine);

// console.log(io._parser);

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Database connection with better error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/health_care";
    console.log("Attempting to connect to MongoDB:", mongoURI);

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use("/api/auth", authRoutes);
//* Routes  for heart rate
app.use("/api/heart-rate", routerHeartRate);
// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Health Care API" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
const io = require('socket.io')(server);
io.on("connection", (socket: Socket) => {
  console.log(`New connection: ${socket.id}`);
  io.emit("event", { message: "Hello from the server!" });
  socket.on("event", (data: any) => {
    console.log("Data:",data);
  });
});