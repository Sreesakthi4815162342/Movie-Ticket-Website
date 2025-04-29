import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Recommended({item}) {
    const navigate=useNavigate()
    const gotoMoviedatails=(id)=>{
        navigate(`/moviedetails/${id}`)
    }
    
  return (
            <div className="carousel-item ">
<div className='group relative overflow-hidden w-48 sm:w-50 md:w-62 lg:w-70'>
        <div className='overflow-hidden rounded-2xl'>
            <img src={item?.image} className='object-cover hover:scale-125 duration-500 cursor-pointer  w-full h-60 sm:h-72 md:h-80' onClick={()=>gotoMoviedatails(item?._id)}/>
        </div>
        <div className='mt-3'>
            <p className='font-bold'>{item?.title}</p>
            <p className='text-sm text-slate-700'>{item?.genre}</p>
        </div>
    </div>
</div>
  )
}

export default Recommended
