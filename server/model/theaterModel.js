const mongoose=require("mongoose")


const theaterSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    image:{
        type:String,
    },
    facilities:{
        type:String,
    },
    totalSeats:{
        type:Number,
        require:true
    },
    rows:{
        type:Number,
        require:true
    },
    columns:{
        type:Number,
        require:true
    },
    seatMap:{
        type:Array,
        default:[]
    },
    owner:{
        type:String,
        require:true
    },
},{timestamps:true})

const theaterModel=new mongoose.model("theaters",theaterSchema)

module.exports={
    theaterModel
}