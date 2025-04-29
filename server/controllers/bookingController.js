const { populate } = require("dotenv")
const { bookingModel } = require("../model/bookingModel")
const { showtimeModel } = require("../model/showtimeModel")

const createBooking=async(req,res)=>{
    try {
        userId=req.user
        const {show,seats,totalPrice}=req.body 

        const newBooking=new bookingModel({user:userId,show, seats,totalPrice})
        await newBooking.save()
        
        await showtimeModel.findByIdAndUpdate(show,{ $addToSet: { bookedSeats: { $each: seats.map(seat => seat.seatNumber) } } },{new:true})
        res.status(201).json("Booked Successfull")
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getBooking=async(req,res)=>{
    try {
        userId=req.user
        const bookings=await bookingModel.find({user:userId}).populate({
            path: 'show', 
            populate: [
              { path: 'movie'},
              {path: 'theater'}
            ]})
        if(!bookings){
            return res.status(400).json("bookings not found")
        }
        res.status(200).json(bookings)
    } catch (error) {
        res.status(error.status|| 500).json({error:error.message||"internal server error"})
    }
}

const getBookings=async(req,res)=>{
try {
    const {id}=req.params
    
    const bookings=await bookingModel.find().populate({
        path:'show',
        populate:{
            path:'theater',
            path:'movie'
        }
    }).populate('user')

    const filteredBookings = bookings.filter(
        (booking) => booking.show?.theater?._id.toString() === id
      );
      if (filteredBookings.length === 0) {
        return res.status(404).json({ error: "No bookings found for this theater" });
      }
        res.status(200).json(filteredBookings)
} catch (error) {
    res.status(error.status|| 500).json({error:error.message||"internal server error"})
}
}
module.exports={
    createBooking,
    getBooking,
    getBookings
}