import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE PROJECT
export const createProject = async (req: any, res: Response) => {
  const { name } = req.body;

  try {
    const project = await prisma.project.create({
      data: {
        name,
        userId: req.user.userId
      }
    });

    res.status(201).json(project);

  } catch (err) {
    res.status(500).json({ message: "Error creating project" });
  }
};


export const getProjectTasks = async (req: any, res: Response) => {

  const projectId = Number(req.params.id);

  try {

    const tasks = await prisma.task.findMany({
      where: {
        projectId
      }
    });

    res.json(tasks);

  } catch (err) {

    res.status(500).json({
      message: "Error fetching project tasks"
    });

  }
};

// GET ALL PROJECTS
export const getProjects = async (req: any, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        userId: req.user.userId
      }
    });

    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: "Error fetching projects" });
  }
};


export const getProjectDashboard = async (
  req: any,
  res: Response
) => {

  const projectId = Number(req.params.id);

  try {

    const totalTasks = await prisma.task.count({
      where: {
        projectId
      }
    });

    const completedTasks = await prisma.task.count({
      where: {
        projectId,
        completed: true
      }
    });

    const pendingTasks = await prisma.task.count({
      where: {
        projectId,
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
      message: "Error fetching dashboard"
    });

  }
};