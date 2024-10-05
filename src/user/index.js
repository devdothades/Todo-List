import {Router} from "express";
import {login, register} from "./User.controller.js";
import userValidation from "./User.middleware.js";

const router = Router();

router.use(userValidation);
router.use("/login", login);
router.use("/register",  register);

export default router;