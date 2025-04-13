const mongoose = require("mongoose");
const Project = require("../models/Project");
const response = require("../utils/response");
const StatusUser = require("../models/StatusUser");

const createProject = async (req, res) => {
  try {
    const newProject = new Project({
      userId: req.user._id,
      ...req.body,
    });

    if (!newProject) {
      res
        .status(response.errors.PROJECT.CREATE_FAILED.status)
        .json({ erros: [response.errors.PROJECT.CREATE_FAILED.message] });
      return;
    }

    let statusUser = await StatusUser.findOne({ userId: req.user._id });

    if (!statusUser) {
      statusUser = new StatusUser({
        userId: req.user._id,
        projectsTotal: 1,
        projectsCurrents: 1,
        projectDate: [
          {
            name: newProject.name,
            startDate: newProject.startDate,
            endDate: newProject.endDate,
          },
        ],
      });
    }

    await statusUser.save();

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
    const { page = 1, limit = 10 } = req.query;

    const project = await Project.find()
      .select("name description answerable startDate endDate color")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalProjects = await Project.countDocuments();

    res.status(response.success.PROJECT.FETCHED.status).json({
      message: response.success.PROJECT.FETCHED.message,
      project,
      meta: {
        totalProjects,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProjects / limit),
        perPage: parseInt(limit),
      },
    });
  } catch (err) {
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ erros: [response.errors.SERVER_ERROR.message] });
  }
};

const getUserProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const currentDate = new Date();

    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(response.errors.INVALID_ID.status)
        .json({ errors: [response.errors.INVALID_ID.message] });
    }

    const filters = { userId: id };

    if (req.query.name) {
      filters.name = { $regex: req.query.name, $options: "i" };
    }

    if (req.query.status) {
      filters.status = req.query.status;
    }

    if (req.query.startDate) {
      filters.startDate.$gte = new Date(req.query.startDate);
    }

    if (req.query.endDate) {
      filters.endDate.$lte = new Date(req.query.endDate);
    }

    await Project.updateMany(
      {
        userId: id,
        endDate: { $lt: currentDate },
        status: "current",
      },
      { $set: { status: "overdue" } }
    );

    const totalProjects = await Project.countDocuments(filters);

    const overdueProjectsCount = await Project.countDocuments({
      userId: id,
      status: "overdue",
    });

    const project = await Project.find(filters)
      .select("name description answerable startDate endDate color status")
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    if (project.length === 0) {
      return res
        .status(response.errors.PROJECT.NOT_FOUND.status)
        .json({ errors: [response.errors.PROJECT.NOT_FOUND.message] });
    }

    res.status(response.success.PROJECT.FETCHED.status).json({
      message: response.success.PROJECT.FETCHED.message,
      project,
      meta: {
        totalProjects,
        overdueProject: overdueProjectsCount,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProjects / parseInt(limit)),
        perPage: parseInt(limit),
      },
    });
  } catch (err) {
    console.error(err);
    res
      .status(response.errors.SERVER_ERROR.status)
      .json({ errors: [response.errors.SERVER_ERROR.message] });
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
