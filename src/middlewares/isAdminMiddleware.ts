import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./authMiddleware";

export const isAdminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ error: "Forbidden: Admins only" });
    return;
  }
  next();
};
