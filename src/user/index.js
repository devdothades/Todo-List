import {Router} from "express";
import {login, register} from "./User.controller.js";

const router = Router();

router.use("/login", login);
router.use("/register", register);

export default router;