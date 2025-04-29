const express=require("express");
const { dbConnection } = require("./config/dbConnection");
const { userRouter } = require("./routes/userRoutes");
const app=express()
require('dotenv').config()
const cors=require('cors')
const cookieparser=require("cookie-parser");
const { movieRouter } = require("./routes/movieRoutes");
const { theaterRouter } = require("./routes/theaterRoutes");
const { reviewRouter } = require("./routes/reviewRoutes");
const { showtimeRouter } = require("./routes/showTimeRoutes");
const { paymentRouter } = require("./routes/paymentRoutes");
const { bookingRouter } = require("./routes/bookingRoutes");

dbConnection()
app.use(cors({
    origin:"https://movie-ticket-website-mac1.vercel.app/",credentials:true
}));
app.get("/", (req, res) => {
    res.json("server started");
  });
app.use(express.json())
app.use("/user",userRouter)
app.use("/movie",movieRouter)
app.use("/theater",theaterRouter)
app.use("/review",reviewRouter)
app.use("/showtime",showtimeRouter)
app.use("/payment",paymentRouter)
app.use("/booking",bookingRouter)
app.use(cookieparser())

app.listen(process.env.PORT,()=>{
    console.log("server starts on port 3000");
})
