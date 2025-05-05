const express = require("express");
const router = express.Router();
const AuthGuard = require("../middlewares/AuthGuard");
const {
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const {
  taskCreateValidator,
  taskUpdateValidator,
} = require("../middlewares/taskValidate");
const handleValidator = require("../middlewares/handleValidator");

router.post("/create/:id",AuthGuard,taskCreateValidator(),handleValidator,createTask);
router.get("/:id", AuthGuard, getTask);
router.put("/update/:id",AuthGuard,taskUpdateValidator(),handleValidator,updateTask);
router.delete("/delete/:id",AuthGuard,deleteTask);

module.exports = router;
