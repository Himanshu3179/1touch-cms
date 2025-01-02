import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../config/jwt";

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: "Unauthorized: Token not provided" });
    return;
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    res.status(401).json({ error: "Unauthorized: Invalid or expired token" });
    return;
  }

  req.user = decodedToken;
  next();
};
