const allowedOrigins=require("./allowedOrigins");

// Cross Origin Resource Sharing(CORS)
const corsOptions = {
    origin: (origin, callback) => {
        // remove !origin deployment time
        if (allowedOrigins?.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        }
        else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    optionsSuccessStatus: 200
}


module.exports = corsOptions;