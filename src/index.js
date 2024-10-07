import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

import ErrorHandlerUtil from "./utils/ErrorHandler.util.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//uses the morgan for development, console outputs
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// routes
import User from "./user/index.js"
import Task from "./tasks/index.js"

app.use("/api/v1/task/", Task)
app.use("/api/v1/auth/", User);

// throws error if the user inputs wrong route
app.use("*", (req, res, next) => {
    next(new Error("404 Not Found"));
});

// error middleware
app.use(ErrorHandlerUtil);

export default app;


