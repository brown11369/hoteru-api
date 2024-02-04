const express = require("express")
const router = express.Router();
const registerController = require("../controllers/registerController");
const handleLogin = require("../controllers/authController");

router.post("/register", registerController)
router.post("/login", handleLogin)


module.exports = router;