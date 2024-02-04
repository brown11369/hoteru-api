const bcrypt = require("bcrypt")
const adminModel = require("../model/adminModel")

const register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!email || !password) return res.status(400).send({ success: false, message: "email and password required." })

        const existUser = await adminModel.findOne({ email })
        if (existUser) return res.status(409).send({ success: false, message: "email exists" }); //conflict
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user with hashed password
        const newAdmin = new adminModel({
            userName,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();

        res.status(201).json({ success: true, message: "registered! please login now" });
    }
    catch (err) {
        res.status(500).send({ success: false, message: err.message })
    }

}

module.exports = register;