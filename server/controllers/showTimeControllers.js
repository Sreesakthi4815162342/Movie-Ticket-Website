const { showtimeModel } = require("../model/showtimeModel")

const getshowTime=async(req,res)=>{
    try {
        const id=req.params.id
        const shows=await showtimeModel.findById(id).populate("theater").populate('movie')
        res.status(200).json(shows)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getshowTimes=async(req,res)=>{
    try {
        const movieId=req.params.id
        const date=req.query.date
        const shows=await showtimeModel.find({movie: movieId ,startDate:date}).populate("theater").populate("movie")
        res.status(200).json(shows)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getshowTimesbyTheaterAndDate=async(req,res)=>{
    try {
        const theaterId=req.params.id
        const  date  = req.query.date;
            const shows = await showtimeModel.find({ theater: theaterId ,startDate: date}).populate("theater").populate('movie')
            res.status(200).json(shows)
            
    }catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getshowTimesbyTheater=async(req,res)=>{
    try {
        const theaterId=req.params.id
            const shows = await showtimeModel.find({ theater: theaterId}).populate('movie')
            res.status(200).json(shows)
            
    }catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}


const getShowsDates=async(req,res)=>{
    try {
        const theaterId=req.params.id
        const showtimes = await showtimeModel.find({ theater: theaterId }).select('startDate'); // Select only startDate
        const startDates = showtimes.map(show => show.startDate); // Extract the startDate from each showtime
        
        // Remove duplicates by creating a Set
        const uniqueStartDates = [...new Set(startDates)];
        res.status(200).json(uniqueStartDates);
        
    }catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getShowsDatesByMovie=async(req,res)=>{
    try {
        const MovieId=req.params.id
        const showtimes = await showtimeModel.find({ movie: MovieId }).select('startDate'); // Select only startDate
        const startDates = showtimes.map(show => show.startDate); // Extract the startDate from each showtime
        
        // Remove duplicates by creating a Set
        const uniqueStartDates = [...new Set(startDates)];
        res.status(200).json(uniqueStartDates);
        
        
    }catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const createshowTime=async(req,res)=>{
    try {
        const {startTime,startDate}=req.body
        const { movieId, theaterId } = req.query;
        if(!startTime||!startDate){
            return res.status(404).json("all fields are required")
        }
        const existshow=await showtimeModel.findOne({movie:movieId,theater:theaterId,startTime,startDate})
        if(existshow){
            return res.status(400).json("show already exist")
        }
        const newTheater=new showtimeModel({movie:movieId,theater:theaterId,startTime,startDate})
        await newTheater.save()
        res.status(201).json("Show created Successfully")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const updateshowTime=async(req,res)=>{
    try {
        const {id}=req.params
        const show=await showtimeModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!show){
            res.status(400).json("show not found")
        }
        res.status(200).json(show)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const deleteshowTime=async(req,res)=>{
    try {
        const {id}=req.params
        const show=await showtimeModel.findByIdAndDelete(id)
        res.status(200).json("Show deleted Successfully")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

module.exports={
    getshowTimes,
    getshowTime,
    createshowTime,
    updateshowTime,
    deleteshowTime,
    getshowTimesbyTheaterAndDate,
    getShowsDates,
    getShowsDatesByMovie,
    getshowTimesbyTheater
}