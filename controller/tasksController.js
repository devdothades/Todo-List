import TaskSchema from "../model/tasks.js";

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
    console.log(userId)
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
        const updatedTask = await TaskSchema.findOneAndUpdate({ _id: id, user: userId }, task, { new: true });
        res.status(200).json({updatedTask})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id
    try {
        // Deleting the task by ID for the user.
        await TaskSchema.findByIdAndDelete({user: userId, _id: id});
        res.status(200).json({message: "Task deleted"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

/**
 * Exporting the task controller functions.
 */
export {createTask, getTasks, updateTask, deleteTask, getTask};



