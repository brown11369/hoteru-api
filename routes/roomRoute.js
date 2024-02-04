const express = require("express")
const router = express.Router()
const { addRoom, allRooms, room, updateRoom, deleteRoom } = require("../controllers/roomController")
const verifyJWT = require("../middlewares/verifyJWT")



router.get("/all", allRooms)
router.get("/single/:id", room)
router.post("/add", verifyJWT, addRoom)
router.patch("/update/:id", verifyJWT, updateRoom)
router.delete("/delete/:id", verifyJWT, deleteRoom)


module.exports = router;



