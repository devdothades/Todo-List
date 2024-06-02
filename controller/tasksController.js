import TaskSchema from "../model/tasks.js";
import expressAsyncHandler from "express-async-handler";

/**
 * Create a new task.
 * @async
 * @function createTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const createTask = expressAsyncHandler(async (req, res) => {
    const {task} = req.body
    const userId = req.user.id
    try {
        await TaskSchema.create({user: userId, task: task});
        res.status(201).json({message: "successfully created"});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
})


/**
 * Get all tasks for a user.
 * @async
 * @function getTasks
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getTasks = expressAsyncHandler(async (req, res) => {
    const userId = req.user.id
    console.log(userId)
    try {
        res.status(200).json(await TaskSchema.find({user: userId}))
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

/**
 * Get a specific task by ID for a user.
 * @async
 * @function getTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const getTask = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id
    try {
        res.status(200).json(await TaskSchema.findById({user: userId, _id: id}));
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

/**
 * Update a specific task by ID for a user.
 * @async
 * @function updateTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const updateTask = expressAsyncHandler(async (req, res) => {
    const {id} = req.params
    const task = req.body
    const userId = req.user.id
    try {
        const updatedTask = await TaskSchema.findOneAndUpdate({_id: id, user: userId}, task, {new: true});
        res.status(200).json({updatedTask})
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

/**
 * Delete a specific task by ID for a user.
 * @async
 * @function deleteTask
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>}
 */
const deleteTask = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    const userId = req.user.id
    try {
        // Deleting the task by ID for the user.
        await TaskSchema.findByIdAndDelete({user: userId, _id: id});
        res.status(200).json({message: "Task deleted"});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
})

/**
 * Exporting the task controller functions.
 */
export {createTask, getTasks, updateTask, deleteTask, getTask};



