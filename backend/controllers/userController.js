const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")
const userModel = require("../models/userModel")

const loginUser = async(req,res)=>{

}

const registerUser = async(req,res)=>{
    let {name,email,password} = req.body

    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({success:false,msg:"User Already Exists"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,msg:"Please Enter a Valid Email"})
        }

        if(password.length < 8){
            return res.json({success:false,msg:"Please Enter a Strong Password"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        


    }
    catch(error){

    }
}

module.exports = {loginUser, registerUser}