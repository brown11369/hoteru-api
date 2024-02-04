const express = require("express")
const router = express.Router();
const registerController = require("../controllers/registerController");
const handleLogin = require("../controllers/authController");
const { updateAdminController, updateRole } = require("../controllers/updateAdminController");

const verifyJWT = require("../middlewares/verifyJWT")
const verifyRoles = require("../middlewares/verifyRoles")
const { admin } = require("../config/allowedRoles")


router.post("/register", registerController)
router.post("/login", handleLogin)

router.post("/update/:id", verifyJWT, updateAdminController)
router.post("/update/roles/:id", verifyJWT, verifyRoles(admin), updateRole)

module.exports = router;