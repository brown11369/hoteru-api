const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path")



const logEvent = async (message, filePath) => {
    const date = format(new Date(), "dd-MM-yyyy")
    const dateTime = format(new Date(), "dd-MM-yyyy\tHH:mm:ss")
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromise.mkdir(path.join(__dirname, "..", "logs"))
        }
        await fsPromise.appendFile(path.join(__dirname, "..", "logs", `${filePath}${date}.txt`), logItem)
    }
    catch (err) {
        console.error(err.message)
    }
}


module.exports = logEvent;
