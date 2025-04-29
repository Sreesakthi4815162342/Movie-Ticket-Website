import React from 'react'
import { useNavigate } from 'react-router-dom'

function Theaters({item}) {
  const navigate=useNavigate()
  const gotoTheaterdetails=(id)=>{
      navigate(`/theaterdetails/${id}`)
  }
  return (
      <div className="flex flex-col">
        <div className='h-40 sm:h-40 md:h-50 lg:h-60 w-full'>
    <img
      src={item?.image}
      className=" rounded-lg shadow-2xl object-cover w-full h-full" onClick={()=>gotoTheaterdetails(item._id)}/>
      </div>
    <div className='py-6'>
        <h1 className='text-lg'>{item?.name}</h1>
        <p>{item?.location}</p>
<p>{item?.facilities}</p>
    </div>
  </div>
  )
}

export default Theaters
