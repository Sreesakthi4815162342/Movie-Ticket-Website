const { movieModel } = require("../model/movieModel");
const { showtimeModel } = require("../model/showtimeModel");
const uploadToCloudinary = require("../utilities/imageUpload");

const getMovies=async(req,res)=>{
    try {
        const genre=req.query.genre
        const filter = genre ? { genre: { $regex: genre, $options: 'i' } } : {}; 
        const movies=await movieModel.find(filter)   
        res.status(200).json({movies})
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getMovie=async(req,res)=>{
    try {
        const {id}=req.params
        const movie=await movieModel.findById(id)
        if(!movie){
            return res.status(400).json("Movie not found")
        }
        res.status(200).json(movie)
        
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const createMovie=async(req,res)=>{
    try {
        const {title,description,genre,duration,language,releaseDate}=req.body
        if(!title||!description||!genre||!duration||!language||!releaseDate){
            return res.status(400).json("all fields are required")
        }
        const existMovie=await movieModel.findOne({title})
        if(existMovie){
            return res.status(400).json("Movie already exist")
        }
        if(!req.file){
            return res.status(400).json("Image not found")
        }
        const cloudinaryRes=await uploadToCloudinary(req.file.path)
        const newMovie=new movieModel({title,description,genre,duration,language,releaseDate,image:cloudinaryRes})
        const savedMovie=await newMovie.save()
        if(savedMovie){
            return res.status(201).json(savedMovie)
        }
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const updateMovie=async(req,res)=>{
    try {
        const {id}=req.params
        let imageUrl;
        let existMovie=await movieModel.findById(id)

        if(!existMovie){
            return res.status(400).json("Movie not found")
        }
        if(req.file){
            const cloudinaryRes=await uploadToCloudinary(req.file.path)
            imageUrl=cloudinaryRes
        }
        const updatedData={...req.body};
        if(imageUrl){
            updatedData.image=imageUrl
        }
        const movie=await movieModel.findByIdAndUpdate(id,updatedData,{new:true})
        res.status(200).json({message:"Movie updated successfully",movie})
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const deleteMovie=async(req,res)=>{
    try {
        const {id}=req.params
        let existMovie=await movieModel.findById(id)

        if(!existMovie){
            return res.status(400).json("Movie not found")
        }
        const deleteMovie=await movieModel.findByIdAndDelete(id)
        await showtimeModel.deleteMany({ movie: movieId });
        res.status(200).json("Movie deleted successfully")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getTotalMovies = async (req, res) => {
    try {
      const count = await movieModel.countDocuments()
      res.status(200).json({ totalMovies: count });
    } catch (error) {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  };

  const getRecommendedMovies = async (req, res) => {
    try {
      const movies = await movieModel.aggregate([
        { $sample: { size: 5 } } 
      ])
      res.json(movies)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

module.exports={
    getMovies,
    getMovie,
    deleteMovie,
    updateMovie,
    createMovie,
    getTotalMovies,
    getRecommendedMovies
}