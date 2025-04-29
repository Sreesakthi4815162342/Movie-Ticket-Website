const mongoose=require("mongoose")

const showtimeSchema=new mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies",
        require:true
    },
    theater:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"theaters",
        require:true
    },
    startTime:{
        type:String,
        require:true
    },
    startDate:{
        type:Date,
        require:true
    },
    bookedSeats:{
        type:[String]
    }
        },{timestamps:true})

const showtimeModel=new mongoose.model("showTimes",showtimeSchema)

module.exports={
    showtimeModel
}