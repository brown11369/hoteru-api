const express = require("express");
const router = express.Router();
const { addBlog, allBlogs, blog, updateBlog, deleteBlog } = require("../controllers/blogController");
const verifyJWT = require("../middlewares/verifyJWT")
const verifyRoles = require("../middlewares/verifyRoles")
const { admin, editor, author} = require("../config/allowedRoles")

router.get("/all",verifyJWT, allBlogs)
router.get("/single/:id", blog)
router.post("/add", verifyJWT, verifyRoles(admin,editor,author), addBlog)
router.patch("/update/:id", verifyJWT, verifyRoles(admin,editor), updateBlog)
router.delete("/delete/:id", verifyJWT, verifyRoles(admin), deleteBlog)

module.exports = router