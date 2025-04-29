const express=require("express")
const { signup, login, logout, fetchProfile, updateProfile, getTotalUsers, getUsers, deleteUser} = require("../controllers/userControllers")
const { authUser } = require("../middleware/authUser")
const { authAdmin } = require("../middleware/authAdmin")

const userRouter=express.Router()


userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.get("/fetchProfile",authUser,fetchProfile)
userRouter.patch("/updateProfile",authUser,updateProfile)
userRouter.get("/totalUsers",getTotalUsers)
userRouter.get('/getUsers',getUsers)
userRouter.delete('/deleteUser/:id',authAdmin,deleteUser)

module.exports={
    userRouter
}