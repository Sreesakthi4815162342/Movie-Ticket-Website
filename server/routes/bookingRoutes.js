const { createBooking, getBooking, getBookings } = require('../controllers/bookingController')
const { authUser } = require('../middleware/authUser')
const {authSeller} = require('../middleware/authSeller')

const bookingRouter=require('express').Router()

bookingRouter.post("/createBooking",authUser,createBooking)
bookingRouter.get("/getBooking",authUser,getBooking)
bookingRouter.get("/getBookings/:id",authSeller,getBookings)

module.exports={
    bookingRouter
}