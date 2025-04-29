import React from 'react'
import { useNavigate } from 'react-router-dom'

function AvailableShows({item}) {
  console.log(item);
    const navigate=useNavigate()
  const gotoSeatselector=(id)=>{
    navigate(`/seats/${id}`)
  }
  return (
    <div>
    <div className='grid lg:grid-cols-2 w-full rounded-lg border border-slate-300 p-3'>
      <div className='flex flex-col gap-2 items-center'>
      <div className='w-30 sm:w-40 md:w-50 lg:w-60'>
      <img
      src={item?.movie?.image}
      className=" rounded-lg shadow-2xl object-cover w-full h-full cursor-pointer h-50 sm:h-60 md:h-70 lg:h-80 w-30 sm:w-40 md:w-50 lg:w-60"/>
      </div>
      <div>
        <p className='font-bold'>{item?.movie?.title}</p>
        </div>
        </div>
      <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 mt-3 place-content-center'>
      {item?.shows.map((show) => (
            <button
              key={show._id}
              className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transition"
              onClick={() => gotoSeatselector(show._id)}
            >
              {show.startTime}
            </button>
          ))}
      </div>
      </div>
    </div>
  )
}

export default AvailableShows
