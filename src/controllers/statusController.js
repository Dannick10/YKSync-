const mongoose = require("mongoose");
const StatusUser = require("../models/StatusUser");
const Project = require("../models/Project");
const response = require("../utils/response");

const getStatusUser = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).select(
      "name startDate endDate status color"
    );

    if (!projects.length) {
      return res.status(response.errors.PROJECT.NOT_FOUND.status).json({
        errors: [response.errors.PROJECT.NOT_FOUND.message],
      });
    }

    const projectsCurrent = projects.filter((p) => p.status === "current");
    const projectsFinish = projects.filter((p) => p.status === "finish");

    let statusUser = await StatusUser.findOne({ userId: req.user._id });

    if (!statusUser) {
      statusUser = new StatusUser({ userId: req.user._id });
    }

    statusUser.projectsTotal = projects.length;
    statusUser.projectsCurrents = projectsCurrent.length;
    statusUser.projectsFinish = projectsFinish.length;
    statusUser.projectsUnfinished = projects.length - projectsFinish.length;

    await statusUser.save();

    return res.status(response.success.status.get.status).json({
      message: response.success.status.get.message,
      status: statusUser,
      projectsTotal: projects,
      projectsCurrent,
      projectsFinish,
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(response.errors.SERVER_ERROR.status).json({
      errors: [response.errors.SERVER_ERROR.message],
    });
  }
};

module.exports = {
  getStatusUser,
};
