const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")
const userModel = require("../models/userModel")

const loginUser = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({ success: false, msg: "Don't Get Any User, Please Signup First !!" })      
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ success: false, msg: "Incorrect Password" })
        }
    
        // token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    }
    catch(error){
        console.log(error);
        res.json({ success: false, msg: "Error" });
    }
}

const registerUser = async (req, res) => {
    let { name, email, password } = req.body

    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, msg: "User Already Exists" })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please Enter a Valid Email" })
        }

        if (password.length < 8) {
            return res.json({ success: false, msg: "Please Enter a Strong Password" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()
        // token 
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, msg: "Error" })
    }
}

module.exports = { loginUser, registerUser }