import { Router } from "express";
import {
  registerUser,
  loginUser,
  promoteToAdmin,
  getMe,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const router = Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.post("/promote", authMiddleware, isAdminMiddleware, promoteToAdmin);
router.get("/me", authMiddleware, getMe);

export default router;