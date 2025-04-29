const express=require("express")
const { getshowTimes, getshowTime, createshowTime, updateshowTime, deleteshowTime, getshowTimesbyTheaterAndDate, getShowsDates, getShowsDatesByMovie, getshowTimesbyTheater } = require("../controllers/showTimeControllers")
const { authAdmin } = require("../middleware/authAdmin")
const { authUser } = require("../middleware/authUser")
const { authSeller } = require("../middleware/authSeller")
const showtimeRouter=express.Router()

showtimeRouter.get("/getShow/:id",getshowTime)
showtimeRouter.get("/getShowsByMovieAndDate/:id",getshowTimes)
showtimeRouter.get("/getShowsbyTheaterandDate/:id",getshowTimesbyTheaterAndDate )
showtimeRouter.get("/getShowsDates/:id", getShowsDates)
showtimeRouter.get("/getShowsDatesByMovie/:id", getShowsDatesByMovie)
showtimeRouter.post("/createShow",authSeller,createshowTime)
showtimeRouter.patch("/updateShow/:id",authSeller,updateshowTime)
showtimeRouter.delete("/deleteShow/:id",authSeller,deleteshowTime)
showtimeRouter.get("/getShowbyTheater/:id",getshowTimesbyTheater)

module.exports={
    showtimeRouter
}