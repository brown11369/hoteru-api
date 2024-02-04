const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization
        if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);

        let validEmail;
        const refreshToken = cookies?.jwt;
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) throw err
                validEmail = decoded.email
            })

        const accessToken = authHeader.split(" ")[1];
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.status(403).send({ success: false, message: "invalid key" })    //invalid token(Forbidden)  
                if (validEmail !== decoded?.userInfo?.email) return res.status(403).send({ success: false, message: "invalid token." })
                req.email = decoded?.userInfo?.email;
                req.roles = decoded?.userInfo?.roles;
                next()
            })
    }
    catch (error) {
        return res.status(500).send({ success: "false", message: error.message })
    }
}

module.exports = verifyJWT;