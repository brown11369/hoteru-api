const logEvent = require("./logEvent")
const reqHandler = (req, res, next) => {
    logEvent(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog")
    next()
}

module.exports = reqHandler;