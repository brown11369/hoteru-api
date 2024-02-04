const adminModel = require("../model/adminModel")

const logoutController = async (req, res) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(200).send({ success: true, message: "your session already expired" })

        const refreshToken = cookies?.jwt
        const foundUser = await adminModel.findOne({ refreshToken: refreshToken })
        if (!foundUser) {
            res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false })
            return res.sendStatus(204)      //success:OK but no content
        }

        foundUser.refreshToken = "",
            foundUser.save()
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: false })
        res.status(200).send({ success: true, message: "you are logged out" })

    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}

module.exports = logoutController;