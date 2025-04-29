import React from 'react'
import { useNavigate } from 'react-router-dom'

function Movie({item,role="user"}) {
    const navigate=useNavigate()
    const gotoMoviedatails=(id)=>{
        if(role=="seller"){
            navigate(`/seller/sellermoviedatails/${id}`)
        }else if(role=="admin"){
            navigate(`/admin/adminmoviedetails/${id}`)
        }else{
            navigate(`/moviedetails/${id}`)
        }    
    }
  return (
<div className='group relative overflow-hidden'>
        <div className='overflow-hidden flex justify-center rounded-xl h-40 sm:h-50 md:h-60 lg:h-70'>
            <img src={typeof item?.image === 'string' ? item.image : URL.createObjectURL(item.image)} className='object-cover hover:scale-125 duration-500 cursor-pointer h-full w-full' onClick={()=>gotoMoviedatails(item?._id)} />
        </div>
        <div className='mt-3'>
            <p className='font-bold'>{item?.title}</p>
            <p className='text-sm text-slate-700'>{item?.genre}</p>
        </div>
    </div>
  )
}

export default Movie
