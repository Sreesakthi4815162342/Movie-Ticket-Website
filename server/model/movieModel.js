const mongoose=require("mongoose");

const movieSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String
    },
    genre:{
        type:String,
        require:true
    },
    duration:{
        type:Number,
        require:true
    },
    language:{
        type:String,
        require:true
    },
    releaseDate:{
        type:Date,
        require:true
    },
    image:{
        type:String,
    },
    
},{timestamps:true})

const movieModel=new mongoose.model("movies",movieSchema)

module.exports={
    movieModel
}