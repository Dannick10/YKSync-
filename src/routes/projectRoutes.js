const express = require("express");
const router = express.Router();
const AuthGuard = require("../middlewares/AuthGuard");
const adminGuard = require("../middlewares/adminGuard");
const {
  createProject,
  updateProject,
  deleteProject,
  getAllProject,
  getUserProject,
  getProject,
} = require("../controllers/projectController");
const { projectCreateValidate } = require("../middlewares/projectValidate");
const handleValidator = require("../middlewares/handleValidator");

router.post(
  "/create",
  AuthGuard,
  projectCreateValidate(),
  handleValidator,
  createProject
);
router.put("/update/:id", AuthGuard, handleValidator, updateProject);
router.delete("/delete/:id", AuthGuard, deleteProject);
router.get("/", AuthGuard, getAllProject);
router.get("/user/:id", AuthGuard, getUserProject);
router.get("/:id", AuthGuard, getProject);

module.exports = router;
