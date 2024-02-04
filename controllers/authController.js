const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ success: false, message: "email and password required" })

        //find the user from db
        const foundUser = await adminModel.findOne({ email })

        //check if user exists
        if (!foundUser) return res.status(401).send({ success: false, message: "invaild email and password" })

        //checking password
        const passwordMatch = await bcrypt.compare(password, foundUser.password)

        if (passwordMatch) {

            const roles = foundUser?.roles;

            const accessToken = jwt.sign(
                {
                    "userInfo": {
                        "email": foundUser?.email,
                        "roles": roles
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15m" }
            )

            const refreshToken = jwt.sign(
                { email: foundUser.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" }
            )

            let { _id, userName, email } = foundUser;

            foundUser.refreshToken = refreshToken;
            foundUser.save()

            res.cookie("jwt", refreshToken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

            res.status(200).send({ success: true, message: "logged in", userInfo: { _id, userName, email, accessToken } })
        }
        else {
            res.status(401).send({ success: false, message: "not matched" })
        }
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}

module.exports = handleLogin;