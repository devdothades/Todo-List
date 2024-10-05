import {Router} from "express";
import verifyJwt from "../auth/Auth.jwt.js";
import validate from "./Tasks.middleware.js";
import {createTask, deleteTask, getTasks, updateTask} from "./Tasks.controller.js";


const router = Router();

router.use(validate)
router.use(verifyJwt)

router.post("/", createTask)
router.delete("/:id", deleteTask)
router.patch("/:id", updateTask)
router.get("/", getTasks)

export default router;