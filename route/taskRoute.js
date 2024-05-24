import express, {Router} from "express";
import {getTasks, createTask, updateTask} from "../controller/tasksController.js";

const router = Router();


router.post("/v1/tasks", createTask)
router.get("/v1/tasks", getTasks)
router.patch("/v1/tasks", updateTask)


export default router;