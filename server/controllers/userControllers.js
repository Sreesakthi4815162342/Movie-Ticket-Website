const bcrypt=require("bcrypt")
const { userModel } = require("../model/userModel");
const { tokenCreation } = require("../utilities/tokenCreation");

const signup=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name||!email||!password){
           return res.status(400).json("All fields are required")
        }
        const existUser=await userModel.findOne({email})
        if(existUser){
            return res.status(400).json("user already exist")
        }
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)
        const newUser=new userModel({name,email,password:hashedPassword})
        const saved=await newUser.save()
        const token=tokenCreation(saved._id)
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}




const login=async(req,res)=>{
    try {
        const {email,password}=req.body 
        
        if(!email||!password){
           return res.status(400).json("All fields are required")
        }
        const existUser=await userModel.findOne({email}).populate('theater');
        if(!existUser){
           return res.status(404).json("user does not exist")
        }
        const passwordMatch=await bcrypt.compare(password,existUser.password)
        if(!passwordMatch){
            return res.status(400).json("password does not match")
        }
        
        const token=tokenCreation(existUser._id,existUser.role)

        res.status(200).json({message:"Login successfull",existUser,token,...(existUser.role === 'seller' && {theater:existUser.theater})})
    } 
    catch (error) {
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}





const logout= async(req,res)=>{
    try {
        await res.clearCookie("userToken")
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const fetchProfile=async(req,res)=>{
    try {
        const id=req.user
        const user=await userModel.findById(id).select("-password")
        if(!user){
            return res.status(404).json("User not found")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const updateProfile=async(req,res)=>{
    try {
        const id=req.user
        const updatedData = { ...req.body };

        if(req.body.password){
            const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(req.body.password,salt)
        updatedData.password = hashedPassword;
        }
        const updatedUser=await userModel.findByIdAndUpdate(id,updatedData,{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(error.code|| 500).json({error:error.message||"internal server error"})
    }
}

const getTotalUsers = async (req, res) => {
    try {
      const count = await userModel.countDocuments();
      res.status(200).json({ totalUsers: count });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  };

  const getUsers=async (req,res)=>{
    try {
        const users=await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

  const deleteUser=async (req,res)=>{
    try {
        const {id}=req.params
        const existUser=await userModel.findById(id)
        if(!existUser){
            return res.status(400).json("User not found")
        }
        await userModel.findByIdAndDelete(id)
        res.status(200).json("User deleted Successfully")
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal server error" });
    }
  }

module.exports={
    signup,
    login,
    logout,
    fetchProfile,
    updateProfile,
    getTotalUsers,
    getUsers,
    deleteUser
}