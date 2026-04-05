import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { authMiddleware } from "./middleware/authMiddleware";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);  

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.send("You are authorized 🔐");
});

export default app;