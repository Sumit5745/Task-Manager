import { io } from "socket.io-client";

const socket = io("ws://localhost:5000");

socket.on("connect", () => {
  console.log("✅ WebSocket Connected:", socket.id);
  socket.emit("registerUser", 1);
});

socket.on("disconnect", () => {
  console.log("❌ WebSocket Disconnected");
});
