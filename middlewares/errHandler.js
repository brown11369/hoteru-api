const logEvent = require("./logEvent")
const errHandler = (err, req, res, next) => {
    logEvent(`${err.name}: ${err.message}`, "errLog")
    // console.error(err.message,err.stack)
    res.status(500).send(err.message)
}

module.exports = errHandler;