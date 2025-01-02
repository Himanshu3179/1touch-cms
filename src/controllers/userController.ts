import { Request, Response } from "express";
import prisma from "../config/database";
import { hashPassword, verifyPassword } from "../utils/passwordUtils";
import { generateToken } from "../config/jwt";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists with this email" });
      return;
    }

    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      res.status(400).json({ error: "Username is already taken" });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username, email, passwordHash: hashedPassword },
    });

    const { passwordHash, ...userWithoutPassword } = user;
    res.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    if (!(await verifyPassword(password, user.passwordHash))) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = generateToken({ id: user.id, role: user.role });
    const { passwordHash, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user details" });
  }
};

export const promoteToAdmin = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { userId } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: "ADMIN" },
    });

    const { passwordHash, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ message: "User promoted to admin", user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: "Failed to promote user to admin" });
  }
};
