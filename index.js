import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

dotenv.configDotenv();

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB)
    .then(() => app.listen(process.env.PORT, () => console.log(`connected to ${process.env.PORT} and database`)))
    .catch(console.log)

import taskRoute from "./route/taskRoute.js";
import userRoute from "./route/userRoute.js";

app.use("/auth", userRoute);
app.use("/api", taskRoute);


