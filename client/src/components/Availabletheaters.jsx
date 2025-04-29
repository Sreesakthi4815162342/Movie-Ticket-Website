import React from 'react'
import { useNavigate } from 'react-router-dom'

function Availabletheaters({item}) {
  const navigate=useNavigate()
  const gotoSeatselector=(id)=>{
    navigate(`/seats/${id}`)
  }
  return(
    <div>
    <div className='grid lg:grid-cols-2 w-full rounded-lg border border-slate-300 p-3 gap-10'>
      <div className='flex flex-col gap-2'>
      <div className='h-40 sm:h-40 md:h-50 lg:h-60 w-full'>
      <img
      src={item?.theater.image}
      className=" rounded-lg shadow-2xl object-cover w-full h-full"/>
      </div>
      <div>
        <p className='font-bold'>{item?.theater.name}</p>
        <p>{item?.theater.location}</p>
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

export default Availabletheaters
