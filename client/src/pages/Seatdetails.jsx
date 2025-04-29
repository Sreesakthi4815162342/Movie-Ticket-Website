import React, { useEffect, useState } from 'react'
import Seatselector from '../components/Seatselector'
import { useParams } from 'react-router-dom'
import { getShow } from '../services/showsApi'
import {  useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { makePayment } from '../services/paymentApi'

const stripePromise=loadStripe(import.meta.env.VITE_PUBLISHED_KEY_STRIPE)

function Seatdetails() {
  const {id}=useParams()
  const seats=useSelector(state=>state.booking.seats)
  const totalPrice = seats.reduce((total, seat) => total + parseInt(seat.price), 0);

  const bookingData={show:id,seats,totalPrice}

  localStorage.setItem("bookingData", JSON.stringify(bookingData));
  
  const [data,setData]=useState([])
  const [movie,setMovie]=useState({title:"",image:""})
  const [theater,setTheater]=useState({name:"",location:""})
  const [date,setDate]=useState({time:"",date:""})
  const [column,setColumns]=useState([])
  const [bookedSeats,setBookedSeats]=useState([])
  useEffect(()=>{
        getShow(id).then((res)=>{
          const showTime=res?.data
          setData(showTime?.theater?.seatMap)
          setColumns(showTime?.theater?.columns)
          setMovie({
            title:showTime?.movie?.title,
            image:showTime?.movie?.image
          })
          setTheater({
            name:showTime?.theater?.name,
            location:showTime?.theater?.location
          })
          setDate({
            time:showTime?.startTime,
            date:showTime?.startDate
          })
          setBookedSeats(showTime?.bookedSeats);
        }).catch((err)=>{
          console.log(err);
        })
      },[])

      const groupedSeats = data.reduce((acc, seat) => {
        if (!acc[seat.type]) acc[seat.type] = []
        acc[seat.type].push(seat)
        return acc
      }, {})

      const makepaymentFunction=async () =>{
        const seatNumbers = seats.map(seat=>seat.seatNumber).join(', ');
        const totalPrice=seats.reduce((acc,seat)=>acc+ parseInt(seat.price),0)

        const products=[{
          movie:{
            title:`${movie.title} - Seat ${seatNumbers}`,
            price:totalPrice,
            image:movie.image,
            theater:theater.name,
            location:theater.location,
            time:date.time,
            date:date.date
          }
        }]

        try {
          const response = await makePayment({products});

          const session=response.data.sessionId;

          const stripe=await stripePromise;
           if(stripe){
            const result = await stripe.redirectToCheckout({sessionId:session});
            if(result.error){
              console.log(result.error.message);
            }
           }else{
            console.log('Stripe failed to load');
           }
        } catch (error) {
          console.error('Payment failed:',error)
        }
      }


  return (
    <div>
    <div>
  <h1 className="text-center mb-5 text-xl font-bold">Select Your Seats</h1>
  <div className="min-h-[60vh] flex items-center justify-center overflow-x-auto flex-col">
  {Object.entries(groupedSeats).map(([type, seats], index) => (
            <div key={index}>
              <h2 className="text-center mb-2 font-semibold">{type} - ₹{seats[0].price}</h2>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${column},40px)`,
                }}
              >
                {seats.map((seat, index) => (
                  <Seatselector key={index} item={seat} bookedSeats={bookedSeats}/>
                ))}
              </div>
            </div>
          ))}
  </div>
</div>
<div className="flex justify-center gap-4 my-4">
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 border rounded-md"></div>
    <span className="text-sm">Available</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 bg-gray-300 rounded-md"></div>
    <span className="text-sm">Booked</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-5 h-5 bg-info rounded-md"></div>
    <span className="text-sm">Selected</span>
  </div>
</div>
<div className='divider'></div>
<div className="flex justify-center p-5">
  <div className="w-full max-w-xl flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
    <div>
      <p className="text-lg text-black font-semibold">{totalPrice}</p>
      <span className="text-sm text-gray-500">{seats.map((seat, i) => (
      <p key={i}>
        Seat {seat.seatNumber} — ₹{seat.price}
      </p>
    ))}</span>
    </div>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium" onClick={makepaymentFunction}>
      Proceed
    </button>
  </div>
</div>
</div>
  )
}

export default Seatdetails
