const adminModel = require("../model/adminModel")

const jwt = require("jsonwebtoken")

const refreshHandler = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies?.jwt
    const foundUser = await adminModel.findOne({ refreshToken: refreshToken })
    if (!foundUser) return res.sendStatus(403)      //Forbidden
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser?.email !== decoded?.email) return res.sendStatus(401);     //decode?.email because it is not under userInfo

            const roles = foundUser?.roles;

            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "email": decoded?.email,
                        "roles": roles
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            );
            res.send({ accessToken })
        })
}

module.exports = refreshHandler;