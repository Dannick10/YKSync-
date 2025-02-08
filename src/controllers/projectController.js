const mongoose = require("mongoose");
const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      answerable,
      startDate,
      endDate,
      frontend,
      backend,
      database,
      apis,
      methodology,
      tests,
      deploy,
      cicd,
      rollback,
      documentation,
      updateDocumentation,
      projectManager,
      supportLead,
      supportTeam,
      supportAvailable,
    } = req.body;

    const newProject = new Project({
      userId: req.user._id,
      name,
      description,
      answerable,
      startDate,
      endDate,
      frontend,
      backend,
      database,
      apis,
      methodology,
      tests,
      deploy,
      cicd,
      rollback,
      documentation,
      updateDocumentation,
      projectManager,
      supportLead,
      supportTeam,
      supportAvailable,
    });

    if (!newProject) {
      res
        .status(response.errors.PROJECT.CREATE_FAILED.status)
        .json({ erros: [response.errors.PROJECT.CREATE_FAILED.message] });
      return;
    }
    d;

    await newProject.save();

    res
      .status(response.success.PROJECT.CREATED.status)
      .json({ message: response.success.PROJECT.CREATED.message, newProject });
  } catch (err) {
    console.log(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate({ _id: id }, req.body);

    if (!project) {
      return res
        .status(response.errors.PROJECT.UPDATE_FAILED.status)
        .json({ erros: [response.errors.PROJECT.UPDATE_FAILED.message] });
    }

    res
      .status(202)
      .json({ message: response.success.PROJECT.UPDATED, project });
  } catch (err) {
    console.log(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(response.errors.INVALID_ID.status)
        .json({ erros: [response.errors.INVALID_ID.message] });
    }

    const project = await Project.findByIdAndDelete({ _id: id });

    if (!project) {
      return res
        .status(response.errors.PROJECT.DELETE_FAILED.status)
        .json({ erros: [response.errors.PROJECT.DELETE_FAILED.message] });
    }

    res
      .status(response.success.PROJECT.DELETED.status)
      .json({ message: response.success.PROJECT.DELETED.message, project });
  } catch (err) {
    console.log(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const getAllProject = async (req, res) => {
  try {
    const project = await Project.find()
      .select("name")
      .select("description")
      .select("answerable")
      .select("startDate")
      .select("endDate");

    res
      .status(response.success.PROJECT.FETCHED.status)
      .json({ message: response.success.PROJECT.FETCHED.message, project });
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const getUserProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(response.errors.INVALID_ID.status)
        .json({ erros: [response.errors.INVALID_ID.message] });
    }

    const project = await Project.find({ userId: id })
      .select("name")
      .select("description")
      .select("answerable")
      .select("startDate")
      .select("endDate");

    if (!project) {
      return res
        .status(response.errors.PROJECT.NOT_FOUND.status)
        .json({ erros: [response.errors.PROJECT.NOT_FOUND.message] });
    }

    res
      .status(response.success.PROJECT.FETCHED.status)
      .json({ message: response.success.PROJECT.FETCHED.message, project });
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(response.errors.INVALID_ID.status)
        .json({ erros: [response.errors.INVALID_ID.message] });
    }

    const project = await Project.findOne({ _id: id });

    if (!project) {
      return res
        .status(response.errors.PROJECT.NOT_FOUND.status)
        .json({ erros: [response.errors.PROJECT.NOT_FOUND.message] });
    }

    res
      .status(response.success.PROJECT.FETCHED.status)
      .json({ message: response.success.PROJECT.FETCHED.message, project });
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getUserProject,
  getProject,
};
