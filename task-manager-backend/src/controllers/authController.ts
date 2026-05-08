import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
      email,
      password: hashedPassword,
      role
    },
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};


export const login = async (req: Request, res: Response) => {
 const { email, password, role } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
  {
    userId: user.id,
    role: user.role
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "1d"
  }
);

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};



