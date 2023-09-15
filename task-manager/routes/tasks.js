const express = require("express");
const router = express.Router();
const {getAllTasks,createTask,getSingleTask, updateTask, deleteTask} = require("../controllers/tasks");

router.get("/", getAllTasks);

router.post("/",createTask);

router.get("/:id",getSingleTask);

router.patch("/:id",updateTask);

router.delete("/api/v1/tasks/:id",deleteTask);

module.exports = router;