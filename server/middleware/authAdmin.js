const jwt =require('jsonwebtoken')
const { userModel } = require("../model/userModel");

const authAdmin=async(req,res,next)=>{
    try {
        authHeader=req.headers.authorization
        
        const adminToken = authHeader && authHeader.split(" ")[1];
        if(!adminToken){
            return res.status(404).json("Access denied ,Token not found")
        }
        const decoded= jwt.verify(adminToken,process.env.JWT_SECRETE)
        if(!decoded){
            return res.status(401).json({error:"Admin not authorized"})
        }

        if(decoded.role!=="admin"){
            return res.status(401).json({error:"Access denied"})
        }
        const admin=await userModel.findById(decoded.id)
        if(!admin){
            return res.json("user not found")
        }
        
        req.user=decoded.id
        next()
    } catch (error) {
        res.json({error:error.message||"internal server error"})
    }
}

module.exports={
    authAdmin
}