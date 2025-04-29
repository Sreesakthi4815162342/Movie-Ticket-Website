const jwt=require("jsonwebtoken")

const tokenCreation=(id,role="user")=>{
    const token=jwt.sign({id:id,role:role},process.env.JWT_SECRETE)
    return token
}

module.exports={
    tokenCreation
}