import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

// CREATE TASK
export const createTask = async (req: any, res: Response) => {
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        userId
      }
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};


// export const getTasks = async (req: any, res: Response) => {
//   const userId = req.user.userId;

//   try {
//     const tasks = await prisma.task.findMany({
//       where: { userId }
//     });

//     res.json(tasks);

//   } catch (err) {
//     res.status(500).json({ message: "Error fetching tasks" });
//   }
// };


export const getTasks = async (req: any, res: Response) => {
  const userId = req.user.userId;

  const { page = 1, limit = 5, search = "", status } = req.query;

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
        title: {
          contains: search as string
        },
        ...(status !== undefined && {
          completed: status === "true"
        })
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    });

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};


export const updateTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.updateMany({
      where: {
        id: Number(id),
        userId
      },
      data: {
        title
      }
    });

    res.json({ message: "Task updated", task });

  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
};



export const deleteTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await prisma.task.deleteMany({
      where: {
        id: Number(id),
        userId
      }
    });

    res.json({ message: "Task deleted", result });

  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
};



export const toggleTask = async (req: any, res: Response) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const task = await prisma.task.findFirst({
      where: {
        id: Number(id),
        userId
      }
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await prisma.task.update({
      where: { id: task.id },
      data: {
        completed: !task.completed
      }
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ message: "Error toggling task" });
  }
};