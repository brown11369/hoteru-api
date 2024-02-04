require("dotenv").config();
const express = require("express");
const reqHandler = require("./middlewares/reqHandler");
const errHandler = require("./middlewares/errHandler");
const app = express();
const cors = require("cors");
const credentails = require("./middlewares/credentails");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const mongoose = require("mongoose");
const adminRoute = require("./routes/adminRoute");
const refreshHandler = require("./controllers/refreshController");
const logoutController = require("./controllers/logoutController");

const PORT = process.env.PORT || 8000

// Connecting database
dbConnect()

// custom middleware log all the route
app.use(reqHandler);


// custom middleware for handle preflight
app.use(credentails);

app.use(cors(corsOptions));

app.use(express.json())

//middleware for cookies
app.use(cookieParser())

// ---------Routes---------

app.get("/refresh", refreshHandler)
app.get("/system-logout", logoutController)
app.use("/admin", adminRoute)



// ---------Routes---------

app.use("*", (req, res) => {
    res.status(404).send({ error: "void" })
})

// custom middleware log the error
app.use(errHandler)

mongoose.connection.once("open", () => {
    console.log("database connected")
    app.listen(PORT, () => {
        console.log(`server up and running on port ${PORT}`)
    })
})
