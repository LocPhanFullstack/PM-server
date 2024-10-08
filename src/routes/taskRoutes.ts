import { Router } from "express";
import { getTasks, updateTaskStatus } from "../controllers/taskController";
import { createTask } from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);

export default router;
