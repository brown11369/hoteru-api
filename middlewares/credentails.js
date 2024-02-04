const allowedOrigins = require("../config/allowedOrigins");

const credentails = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins?.includes(origin)) {
        res.header("Access-Control-Allow-Creadentials", true);
    }
    next()
}

module.exports = credentails;