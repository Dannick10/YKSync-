const Task = require("../models/task");
const response = require("../utils/response");

const createTask = async (req, res) => {
  const { id } = req.params;

  try {
    const newTask = new Task({
      userId: req.user._id,
      projectId: id,
      ...req.body,
    });

    if (!newTask) {
      res
        .status(response.errors.TASK.CREATE_FAILED.status)
        .json({ erros: [response.errors.TASK.CREATE_FAILED.message] });
      return;
    }

    await newTask.save();

    res
      .status(response.success.TASK.CREATED.status)
      .json({ message: response.success.TASK.CREATED.message, newTask });
  } catch (err) {
    console.log(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ message: response.errors.SERVER_ERROR.message });
  }
};

const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const tasks = await Task.find({ projectId: id });

    if (!tasks) {
      res
        .status(response.errors.TASK.CREATE_FAILED.status)
        .json({ erros: [response.errors.TASK.CREATE_FAILED.message] });
      return;
    }

    res
      .status(response.success.TASK.FETCHED.status)
      .json({ message: response.success.TASK.FETCHED.message, tasks });
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ message: response.errors.SERVER_ERROR.message });
  }
};

const updateTask = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      res
        .status(response.errors.TASK.CREATE_FAILED.status)
        .json({ erros: [response.errors.TASK.CREATE_FAILED.message] });
      return;
    }

    task.status = status;

    await task.save();

    res
      .status(response.success.TASK.UPDATED.status)
      .json({ message: response.success.TASK.UPDATED.message, task });
  } catch (err) {
    console.error(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ message: response.errors.SERVER_ERROR.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(response.errors.TASK.DELETE_FAILED.status)
        .json({ erros: [response.errors.TASK.DELETE_FAILED.message] });
    }

    res
      .status(response.success.TASK.DELETED.status)
      .json({ message: response.success.TASK.DELETED.message, task });
  } catch (err) {
    console.log(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ message: response.errors.SERVER_ERROR.message });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
