const express=require("express")
const { getReviews, createReview} = require("../controllers/reviewControllers")
const { authUser } = require("../middleware/authUser")
const reviewRouter=express.Router()

reviewRouter.get("/getReviews/:id",authUser,getReviews)
reviewRouter.post("/createReview/:id",authUser,createReview)

module.exports={
    reviewRouter
}