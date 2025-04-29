const mongoose=require("mongoose")

const bookingSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true
    },
    show:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"showTimes",
        require:true
    },
    seats:[
        {
            seatNumber:String,
            seatType:String,
            price:Number
        }
    ],
    totalPrice:{
        type:Number,
        require:true
    },
    bookingDate:{
        type:Date,
        default:Date.now
    }
})

const bookingModel=new mongoose.model("booking",bookingSchema)

module.exports={
    bookingModel
}