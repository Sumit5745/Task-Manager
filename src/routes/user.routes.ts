import express from "express";
import { Login, Register } from "../controller/user.controller";
import {
  loginValidator,
  registerValidator,
} from "../validation/auth.validation";

const router = express.Router();

router.post("/register", registerValidator(), Register);
router.post("/login", loginValidator(), Login);

export default router;
