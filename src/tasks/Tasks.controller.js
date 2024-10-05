import TaskSchema from "./Tasks.model.js";

const createTask = (req, res) => {
    const {task, status} = req.body;
    console.log(req.user)
    console.log(task);

}
const deleteTask = (req, res) => {
}
const updateTask = (req, res) => {
}
const getTasks = (req, res) => {
}

export {createTask, deleteTask, getTasks, updateTask}