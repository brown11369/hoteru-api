require("dotenv").config();
const express = require("express");
const reqHandler = require("./middlewares/reqHandler");
const app = express();

const PORT = process.env.PORT || 8000

// custom middleware log all the route
app.use(reqHandler);

app.use(express.json())

// ---------Routes---------

app.get("/",(re,res)=>res.status(200).send({success:true,message:"developed logger"}))

app.use("*", (req, res) => {
    res.status(404).send({ error: "void" })
})


app.listen(PORT, () => {
    console.log(`server up and running on port ${PORT}`)
})
