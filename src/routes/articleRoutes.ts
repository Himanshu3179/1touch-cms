import { Router } from "express";
import {
  createArticle,
  getArticles,
  deleteArticle,
} from "../controllers/articleController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Protected routes
router.post("/", authMiddleware, createArticle);
router.get("/", getArticles);
router.delete("/:id", authMiddleware, deleteArticle);

export default router;
