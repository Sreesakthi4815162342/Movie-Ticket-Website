import React, { useEffect, useState } from 'react'
import { getBooking } from '../services/bookingApi'
import Booking from '../components/Booking'

function Mybookings() {
  const [bookings,setBooking]=useState([])

  useEffect(()=>{
    getBooking().then((res)=>{
      setBooking(res.data)
    })
  },[])
  return (
    <div className='grid grid-rows sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5  place-content-center'>
      {
        bookings.map((booking)=>(
          <Booking item={booking} key={booking._id}/>
        ))
      }
    </div>
  )
}

export default Mybookings
