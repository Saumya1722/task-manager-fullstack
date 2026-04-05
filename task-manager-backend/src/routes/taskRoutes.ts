import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createTask, getTasks } from "../controllers/taskControllers";4
import { updateTask } from "../controllers/taskControllers";
import { deleteTask } from "../controllers/taskControllers";
import { toggleTask } from "../controllers/taskControllers";


const router = express.Router();

router.post("/", authMiddleware, createTask);
router.get("/", authMiddleware, getTasks);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id/toggle", authMiddleware, toggleTask);

export default router;

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc3NTQwNjUzMSwiZXhwIjoxNzc1NDEwMTMxfQ.Wl0puu5r4z0uols9Yip4ULS4ZZeam6Te2uaTmu0jcUg"

