import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboard = async (req: any, res: Response) => {
  try {

    const totalTasks = await prisma.task.count({
      where: {
        userId: req.user.userId
      }
    });

    const completedTasks = await prisma.task.count({
      where: {
        userId: req.user.userId,
        completed: true
      }
    });

    const pendingTasks = await prisma.task.count({
      where: {
        userId: req.user.userId,
        completed: false
      }
    });

    res.json({
      totalTasks,
      completedTasks,
      pendingTasks
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching dashboard data"
    });
  }
};