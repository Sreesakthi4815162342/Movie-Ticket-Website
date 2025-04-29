const { default: mongoose } = require("mongoose")
const { reviewModel } = require("../model/reviewModel")

const getReviews=async(req,res)=>{
    try {
        const movieId=req.params.id
        const review=await  reviewModel.find({movie:movieId}).populate('user')
        if(!review){
            res.status(404).json("review not found")
        }
        res.status(200).json(review)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const createReview=async(req,res)=>{
    try {
        const userId=req.user
        const movieId=req.params.id
        const {rating,comment}=req.body
        if(!rating||!comment){
            return res.status(400).json("all fields are required")
        }

        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(movieId)
          ) {
            return res.status(400).json("Invalid user or movie ID");
          }
const existReview=await reviewModel.findOne({user:userId,movie:movieId})
if(existReview)  {
    return res.status(400).json("You have already reviewed this movie.");
}    
        const newReview=new reviewModel({user:userId,movie:movieId,rating,comment})
        await newReview.save()
        res.status(201).json("Review created Successfully")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}


module.exports={
    getReviews,
    createReview,
}