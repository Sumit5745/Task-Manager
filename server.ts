import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./src/config/database";
import authRoutes from "./src/routes/user.routes";
import { errors } from "celebrate";
dotenv.config();

const app = express();

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// middleware
app.use(cors());
app.use(express.json());

// socket connection
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

// routes
app.use("/api/v1/auth", authRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database synced successfully");
  })
  .catch((Error) => {
    console.error("Error to sync the database:", Error);
  });

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});

app.use(errors());
