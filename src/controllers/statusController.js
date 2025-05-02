const mongoose = require("mongoose");
const StatusUser = require("../models/StatusUser");
const Project = require("../models/Project");
const response = require("../utils/response");
const project = require("../models/Project");

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
    const projectsOverdue = projects.filter((p) => p.status === "overdue");

    let statusUser = await StatusUser.findOne({ userId: req.user._id });

    if (!statusUser) {
      statusUser = new StatusUser({ userId: req.user._id });
    }

    statusUser.projectsTotal = projects.length;
    statusUser.projectsCurrents = projectsCurrent.length;
    statusUser.projectsFinish = projectsFinish.length;
    statusUser.projectsOverdue = projectsOverdue.length

    await statusUser.save();

    return res.status(response.success.status.get.status).json({
      message: response.success.status.get.message,
      status: statusUser,
      projectsTotal: projects,
      projectsCurrent,
      projectsFinish,
      projectsOverdue
    });
  } catch (error) {
    console.error("Error fetching user status:", error);
    return res.status(response.errors.SERVER_ERROR.status).json({
      errors: [response.errors.SERVER_ERROR.message],
    });
  }
};

const getStacksUser = async (req, res) => {
  try {
    
    const Stacks = await Project.find({ userId: req.user._id }).select(
      "frontend backend database tests"
    );
    
    if (!Stacks.length) {
      return res.status(response.errors.PROJECT.NOT_FOUND.status).json({
        errors: [response.errors.PROJECT.NOT_FOUND.message],
      });
    }
    
    const categories = Object.keys(Stacks[0]._doc).filter((key) => key !== "_id"); 
    
    const countStacks = {};
    
    categories.forEach((category) => {
      countStacks[category] = {};
    
      Stacks.forEach((stack) => {
        const value = stack[category];
       
        const safeValue = typeof value === "string" ? value : String(value || "");
        const items = safeValue
          .toLowerCase()
          .split(",")
          .map((str) => str.trim())
          .filter((str) => str); 
    
        items.forEach((item) => {
          countStacks[category][item] = (countStacks[category][item] || 0) + 1;
        });
      });
    });
    
    return res.status(response.success.status.get.status).json({
      message: response.success.status.get.message,
      stacks: countStacks,
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
  getStacksUser,
};
