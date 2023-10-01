const express = require("express");
const router = express.Router();
const {getAllJobs,getJob,createJob,updateJob,deleteJob} = require("../controllers/jobs");
const authenticateUser = require("../middleware/authentication");

router.get("/",authenticateUser, getAllJobs );
router.get("/:id",authenticateUser,getJob );
router.post("/",authenticateUser,createJob );
router.patch("/:id",authenticateUser,updateJob );
router.delete("/:id", authenticateUser, deleteJob );

module.exports =router;