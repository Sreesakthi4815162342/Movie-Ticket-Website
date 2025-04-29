const mongoose=require("mongoose")

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        require:true
    },
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
        require:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        require:true
    },
    comment:{
        type:String,
        trim:true
    },
},{timestamps:true})

reviewSchema.index({ user: 1, movie: 1 }, { unique: true });
const reviewModel=new mongoose.model("review",reviewSchema)

module.exports={
    reviewModel
}