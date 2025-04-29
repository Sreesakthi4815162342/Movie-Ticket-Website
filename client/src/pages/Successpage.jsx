import React, { useEffect, useRef } from 'react'
import { createBooking } from '../services/bookingApi';
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Successpage() {
  const hasRun = useRef(false);
  const navigate=useNavigate()

  useEffect(()=>{
    if (hasRun.current) return;
    hasRun.current = true;
    const storedData=JSON.parse(localStorage.getItem("bookingData"));
 
    

    if (storedData) {
      createBooking(storedData)
        .then(() => {
          console.log("Booking successful");
          localStorage.removeItem("bookingData");
        })
        .catch((err) => {
          console.error("Booking failed", err);
        });
    }
  }, [])
    
  return (
    <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col justify-center items-center">
        <SiTicktick className='h-20 w-20 text-green-500'/>
          <h1 className="text-3xl font-bold my-4 ">Booking Successful!</h1>
          <p className="text-lg">Enjoy your movie 🎬</p>
          <button
            onClick={() => navigate('/bookings')}
            className="mt-5 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            View My Bookings
          </button>
        </div>
    </div>
  )
}

export default Successpage
