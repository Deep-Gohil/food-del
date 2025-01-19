const jwt = require("jsonwebtoken");

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success: false, msg: "No Token, Authorization Denied"})
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id 
        next();  
    }
    catch(error){
        console.log(error);
        res.status(403).json({success: false, msg: "Token is Not Valid"})
    }
}

module.exports = authMiddleware;