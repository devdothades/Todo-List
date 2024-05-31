import TaskSchema from "../model/tasks.js";
import user from "../model/user.js";

const createTask = async (req, res) => {
    const {task} = req.body
    const userId = req.user.id
    try {
        await TaskSchema.create({user: userId, task: task});
        res.status(201).json({message: "successfully created"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getTasks = async (req, res) => {
    const userId = req.user.id
    try {
        res.status(200).json(await TaskSchema.find({user: userId}))
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const getTask = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id
    try {
        res.status(200).json(await TaskSchema.findById({user: userId, id}));
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const updateTask = async (req, res) => {
    const {id} = req.params
    const task = req.body
    const userId = req.user.id
    try {
        res.status(200).json({
            message: "Task Updated", data: await TaskSchema.findOneAndUpdate({_id: id, user: userId}, task, {new: true})
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id
    try {
        await TaskSchema.findByIdAndDelete({user: userId, id});
        res.status(200).json({message: "Task deleted"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {createTask, getTasks, updateTask, deleteTask, getTask};



