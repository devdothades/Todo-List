import asyncHandler from "../utils/CatchAsync.util.js";
import TaskSchema from "./Tasks.model.js";

const createTask = asyncHandler(async (req, res) => {
    const {task, status} = req.body;
    const user = req.user;

    try {
        const data = await TaskSchema.create({user_id: user, task: task, status: status});
        data ? res.status(200).json({success: data}) : res.status(400).json({error: "Something went wrong"})
    } catch (err) {
        res.status(500).send({Fail: "Something went wrong"});
    }

})

const deleteTask = asyncHandler(async (req, res) => {
    const taskId = req.params.id;
    const user = req.user;

    try {
        const data = await TaskSchema.deleteOne({_id: taskId, user_id: user.id});
        data ? res.status(200).json({success: data}) : res.status(400).json({error: "Something went wrong"})
    } catch (err) {
        res.status(500).send({Fail: "Something went wrong"});
    }


})
const updateTask = asyncHandler(async (req, res) => {
    const {task, status} = req.body;
    const taskId = req.params.id;
    const user = req.user;

    try {
        const data = await TaskSchema.findByIdAndUpdate({_id: taskId, user_id: user.id}, {task, status}, {new: true});
        data ? res.status(200).json({success: data}) : res.status(400).json({error: "Something went wrong"});
    } catch (err) {
        res.status(500).send({Fail: "Something went wrong"});
    }

})
const getTasks = asyncHandler(async (req, res) => {
    const user = req.user;

    try {
        const data = await TaskSchema.find({user_id: user})
        data ? res.status(200).json({success: data}) : res.status(400).json({error: "Something went wrong"})
    } catch (err) {
        res.status(500).send({Fail: "Something went wrong"});
    }

})

export {createTask, deleteTask, getTasks, updateTask}