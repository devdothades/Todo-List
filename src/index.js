import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import ErrorHandlerUtil from "./utils/ErrorHandler.util.js";

dotenv.config();


const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
import User from "./user/index.js"
import Task from "./tasks/index.js"
app.use("/api/v1/task/", Task)
app.use("/api/v1/auth/", User);

app.use("*", (req, res, next) => {
  next(new Error("404 Not Found"));
});


app.use(ErrorHandlerUtil);

export default app;


