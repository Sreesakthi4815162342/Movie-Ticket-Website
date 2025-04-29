const express=require("express")
const { getTheaters, getTheater, createTheater, updateTheater, deleteTheater, getTotalTheaters } = require("../controllers/theaterControllers")
const { upload } = require("../middleware/multer")
const { authSeller } = require("../middleware/authSeller")
const { authAdmin } = require("../middleware/authAdmin")
const theaterRouter=express.Router()

theaterRouter.get("/getTheaters",getTheaters)
theaterRouter.get("/getTheater/:id",getTheater)
theaterRouter.post("/createTheater",upload.single("image"),authAdmin,createTheater)
theaterRouter.patch("/updateTheater/:id",upload.single("image"),authSeller,updateTheater)
theaterRouter.delete("/deleteTheater/:id",authAdmin,deleteTheater)
theaterRouter.get("/totalTheaters",getTotalTheaters)

module.exports={
    theaterRouter
}