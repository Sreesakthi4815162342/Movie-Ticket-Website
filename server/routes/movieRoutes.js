const express=require("express")
const { getMovies, getMovie, createMovie, updateMovie, deleteMovie, getTotalMovies, getRecommendedMovies } = require("../controllers/movieControllers")
const { upload } = require("../middleware/multer")
const { authAdmin } = require("../middleware/authAdmin")
const { authUser } = require("../middleware/authUser")
const movieRouter=express.Router()

movieRouter.get("/getMovies",getMovies)
movieRouter.get("/getMovie/:id",getMovie)
movieRouter.post("/createMovie",upload.single("image"),authAdmin,createMovie)
movieRouter.patch("/updateMovie/:id",upload.single("image"),authAdmin,updateMovie)
movieRouter.delete("/deleteMovie/:id",authAdmin,deleteMovie)
movieRouter.get("/totalMovies",getTotalMovies)
movieRouter.get("/getrecommendMovies",getRecommendedMovies)
module.exports={
    movieRouter
}