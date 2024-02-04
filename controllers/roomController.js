const roomModel = require("../model/roomModel")


const addRoom = async (req, res) => {
    try {
        const room = req.body
        if (!room?.roomName || !room?.price) return res.status(400).send({ success: false, message: "name and price require" })
        const foundRoom = await roomModel.findOne({ roomName: room.roomName });
        if (foundRoom) return res.status(409).send({ success: false, message: "room exist" })

        const newRoom = new roomModel(room)

        newRoom.save()

        res.status(201).send({ success: true, message: "room listed" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const allRooms = async (req, res) => {
    try {
        const allRooms = await roomModel.find()
        res.status(200).send({ success: true, data: allRooms })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const room = async (req, res) => {
    try {
        const roomID = req.params.id;
        const foundRoom = await roomModel.findById({ _id: roomID })
        res.status(200).send(foundRoom)
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const updateRoom = async (req, res) => {
    try {
        const roomID = req.params.id;
        const roomData = req.body;

        const foundRoom = await blogModel.findOne({ _id: roomID })
        if (!foundRoom) return res.status(404).send({ success: false, message: "room not exist" })

        await roomModel.updateOne({ _id: roomID }, roomData)

        res.status(200).send({ success: true, message: "room updated" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}

const deleteRoom = async (req, res) => {
    try {
        const roomID = req.params.id;
        await roomModel.deleteOne({ _id: roomID })
        res.status(200).send({ success: true, message: "room deleted" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}


module.exports = { addRoom, allRooms, room, updateRoom, deleteRoom }