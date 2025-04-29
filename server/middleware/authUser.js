const jwt=require("jsonwebtoken");
const { userModel } = require("../model/userModel");

const authUser=async(req,res,next)=>{
    try {
        authHeader=req.headers.authorization
        const userToken = authHeader && authHeader.split(" ")[1];
        if(!userToken){
            return res.status(404).json("Access denied ,Token not found")
        }
        const decoded= jwt.verify(userToken,process.env.JWT_SECRETE)
        if(!decoded){
            return res.status(401).json({error:"user not authorized"})
        }
        if(decoded.role!=="user"){
            return res.status(401).json({error:"Access denied"})
        }
        const user=await userModel.findById(decoded.id)
        if(!user){
            return res.json("user not found")
        }
        req.user=decoded.id
        next()
    } catch (error) {
        res.json({error:error.message||"internal server error"})
    }
}

module.exports={
    authUser
}