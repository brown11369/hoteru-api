const mongoose = require("mongoose");
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.OFFLINE_DB_URI)
    }
    catch (err) {
        console.error(err)
    }
}

module.exports=dbConnect;