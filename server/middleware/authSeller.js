const jwt=require("jsonwebtoken");
const { userModel } = require("../model/userModel");

const authSeller=async(req,res,next)=>{
    try {
        authHeader=req.headers.authorization
        const sellerToken = authHeader && authHeader.split(" ")[1];
        if(!sellerToken){
            return res.status(404).json("Access denied ,Token not found")
        }
        const decoded= jwt.verify(sellerToken,process.env.JWT_SECRETE)
        if(!decoded){
            return res.status(401).json({error:"Seller not authorized"})
        }
        if(decoded.role!=="seller"){
            return res.status(401).json({error:"Access denied"})
        }
        const seller=await userModel.findById(decoded.id)
        if(!seller){
            return res.json("user not found")
        }
        req.user=decoded.id
        next()
    } catch (error) {
        res.json({error:error.message||"internal server error"})
    }
}

module.exports={
    authSeller
}