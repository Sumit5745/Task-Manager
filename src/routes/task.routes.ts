import express from "express";
import { authenticateJWT, authorizeRole } from "../middleware/auth.middleware";
import {
  cerateTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controller/task.controller";

const router = express.Router();

router.post("/create", authenticateJWT, cerateTask);
router.get("/getTask", authenticateJWT, getTasks);
router.patch("/update/:id", authenticateJWT, updateTask);
router.delete(
  "/delete/:id",
  authenticateJWT,
  authorizeRole(["ADMIN"]),
  deleteTask
);

export default router;
