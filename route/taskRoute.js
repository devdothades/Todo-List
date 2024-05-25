import {Router} from "express";
import {getTasks, createTask, updateTask, deleteTask} from "../controller/tasksController.js";

const router = Router();


router.post("/v1/tasks", createTask)
router.get("/v1/tasks", getTasks)
router.patch("/v1/tasks/:id", updateTask)
router.delete("/v1/tasks/:id", deleteTask)


export default router;