const express = require("express");
const router = express.Router();
const {login,dashboard} = require("../controllers/main");
const authMiddleware = require("../middleware/auth")
 


router.post("/login",login);

router.get("/dashboard",authMiddleware,dashboard)//so everytime some1 is going to be hitting this route, first they must go through the middleware;

module.exports = router