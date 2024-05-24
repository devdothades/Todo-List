import TaskSchema from "../model/tasks.js";

const createTask = async (req, res) => {
    const task = new TaskSchema({
        task: req.body.task
    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getTasks = async (req, res) => {
    try {
        const tasks = await TaskSchema.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const updateTask = async (req, res) => {
    const {id} = req.params
    const task = req.body
    try {
       const data = await TaskSchema.findByIdAndUpdate({id})
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404).json({message: error.message});
    }
}

export {createTask, getTasks, updateTask};



