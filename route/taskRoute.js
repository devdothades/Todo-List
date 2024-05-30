import {Router} from "express";
import {getTasks, createTask, updateTask, deleteTask, getTask} from "../controller/tasksController.js";
import Auth from '../middleware/Auth.js'

const router = Router();

router.use(Auth)
router.post("/v1/tasks", createTask)
router.get("/v1/tasks", getTasks)
router.get("/v1/tasks/:id", getTask)
router.patch("/v1/tasks/:id", updateTask)
router.delete("/v1/tasks/:id", deleteTask)


export default router;