import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./src/config/database";
import authRoutes from "./src/routes/user.routes";
import taskRoutes from "./src/routes/task.routes";
import notificationRoutes from "./src/routes/notification.routes";
import { errors } from "celebrate";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connect", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("registerUser", (data) => {
    socket.join(`user-${data.userId}`);
    console.log(`User ${data.userId} joined room: user-${data.userId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(process.env.PORT, async () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  await connectDB();
});

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/notifications", notificationRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("database synced successfully");
  })
  .catch((Error) => {
    console.error("Error to sync the database:", Error);
  });

app.use(errors());
