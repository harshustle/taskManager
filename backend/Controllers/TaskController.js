const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
  const data = req.body;
  try {
    const Model = new TaskModel(data);
    console.log(Model);
    await Model.save();
    res
      .status(201)
      .json({ message: "Task Created Successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};

const fetchTasks = async (req, res) => {
  const allTasks = await TaskModel.find();
  res.json(allTasks);
};

const deleteTask = async (req, res) => {
  console.log(req.params);
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Task ID is required", success: false });
  }
  try {
    await TaskModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Task deleted successfully", success: true });
  } catch (error) {
    const message = "Task not found";
    res.status(404).json({ message, success: false });
  }
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body}};
    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(id, obj, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found", success: false });
      }
      res.status(200).json({ message: "Task updated successfully", success: true, data: updatedTask });
    } catch (error) {
        
    }
}

const searchTask = async (req, res) => {
  const { search } = req.query;
  const allTasks = await TaskModel.find({ title: { $regex: search, $options: "i" } });
  res.json(allTasks);
};

module.exports = {
  createTask,
  fetchTasks,
  deleteTask,
  updateTask,
  searchTask,
};
