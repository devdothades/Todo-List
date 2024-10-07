import app from "./src/index.js";
import mongoose from "mongoose";

// shutdowns the server if something goes wrong
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT EXCEPTION! shutting down...");
    console.log(err.name + " " + err.message);
    process.exit(1);
});


// database connection
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
});

// connecting to server
const server = app.listen(process.env.PORT, () => {
    console.log("Listening on port " + server.address().port);
});

process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection! shutting down...");
    console.log(err.name + " " + err.message);
    server.close(() => {
        process.exit(1);
    });
});
