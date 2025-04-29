import React from 'react'
import { useNavigate } from 'react-router-dom'

function Banner() {
  return (
       <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 px-8 flex flex-col items-center justify-center overflow-hidden rounded-md">
  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
    🎟️ Book Your Tickets Now!
  </h1>
  <p className="text-lg md:text-2xl mb-8 text-gray-300 text-center">
    Experience the Magic of Movies from the Best Seats.
  </p>
  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full text-lg transition duration-300">
    Book Now
  </button>
  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://cinemascholars.com/wp-content/uploads/2022/07/3cf656908a2481110485bac3bf1297d9.jpg')" }}></div>
</div>
  )
}

export default Banner
