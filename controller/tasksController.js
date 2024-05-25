import TaskSchema from "../model/tasks.js";

const createTask = async (req, res) => {
    try {
        await TaskSchema.create(req.body);
        res.status(201).json({message: "successfully created"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getTasks = async (req, res) => {
    try {
        const data = await TaskSchema.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const updateTask = async (req, res) => {
    const {id} = req.params
    const task = req.body

    try {
        const data = await TaskSchema.findOneAndUpdate({_id: id}, task, {new: true});
        res.status(200).json({message: "Task Updated", data});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const deleteTask = async (req, res) => {
    const {id} = req.params

    try {
        await TaskSchema.findByIdAndDelete(id);
        res.status(200).json({message: "Task deleted"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {createTask, getTasks, updateTask, deleteTask};



