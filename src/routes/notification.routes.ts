import express from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import {
  getNotification,
  markNotificationAsRead,
} from "../controller/notification.controller";

const router = express.Router();

router.get("/get", authenticateJWT, getNotification);
router.put("/:id/read", authenticateJWT, markNotificationAsRead);

export default router;
