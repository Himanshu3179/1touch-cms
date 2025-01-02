import { Request, Response } from "express";
import prisma from "../config/database";

export const createArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, content, sourceUrl } = req.body;
  const userId = (req as any).user?.id; // Get user ID from auth middleware

  try {
    const article = await prisma.article.create({
      data: {
        title,
        content,
        sourceUrl,
        author: userId,
      },
    });
    res.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    res.status(500).json({ error: "Failed to create article" });
  }
};

export const getArticles = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const articles = await prisma.article.findMany();
    res.status(200).json({ articles });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
};

export const deleteArticle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.article.delete({ where: { id } });
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete article" });
  }
};
