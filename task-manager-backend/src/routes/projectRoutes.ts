import express from "express";
import {
  createProject,
  getProjects,
  getProjectTasks,
  getProjectDashboard
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/authMiddleware";
import { adminMiddleware } from "../middleware/adminMiddleware";


const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createProject);

router.get("/", authMiddleware, getProjects);

router.get("/:id/tasks", authMiddleware, getProjectTasks);

router.get("/:id/dashboard", authMiddleware, getProjectDashboard);
export default router;