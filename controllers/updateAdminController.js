const adminModel = require("../model/adminModel");
const { editorUser, authorUser, noobUser } = require("../config/allowedRoles")


const updateAdminController = async (req, res) => {
    try {
        const userID = req.params.id
        const { roles, password, ...rest } = req.body;

        const foundUser = await adminModel.findById(userID);

        if (!foundUser) return res.status(401).send({ success: false, message: "not exist" })
        await adminModel.findByIdAndUpdate(userID, rest)

        res.status(200).send({ success: true, message: "user updated" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message });
    }
}

const updateRole = async (req, res) => {
    try {
        const roles = req.body.roles;
        const userID = req.params.id;

        const foundUser = await adminModel.findById(userID);

        if (!foundUser) return res.status(401).send({ success: false, message: "not exist" })

        if (roles === "editor") {
            foundUser.roles = editorUser;
            foundUser.roleName = "editor";
        }
        else if (roles === "author") {
            foundUser.roles = authorUser;
            foundUser.roleName = "author";
        }
        else if (roles === "noob") {
            foundUser.roles = noobUser;
            foundUser.roleName = "noob";
        }
        else {
            return res.status(200).send({ success: true, message: "nothing update" })
        }

        foundUser.save()

        res.status(200).send({ success: true, message: "roles updated" })
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }
}


module.exports = { updateAdminController, updateRole }