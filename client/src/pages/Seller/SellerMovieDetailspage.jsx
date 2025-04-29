import React, { useEffect, useState } from 'react'
import { getMovie } from '../../services/movieApi'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCirclePlay } from 'react-icons/fa6'
import { IoAddOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { createShow } from '../../services/showsApi'

function SellerMovieDetailspage() {
  const navigate=useNavigate()
  const {id}=useParams()
  const [movie,setMovie]=useState({})
  const [data,setData]=useState({startTime:"",startDate:""})
  const userData=useSelector((state)=>state.user)
  const theaterId=userData.user.theater._id
  const movieId=movie._id

  const handleChange=(event)=>{
setData(prev=>({...prev,[event.target.name]:event.target.value}))
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    toast.success("submitted")
    createShow(data,movieId,theaterId).then((res)=>{
      toast.success(res?.data?.massage)
      navigate("/seller/sellermoviespage")
    }).catch((err)=>{
      toast.error(err?.response?.data?.error)
    })
  }

    useEffect(()=>{
        getMovie(id).then((res)=>{
            setMovie(res.data)
        }).catch((err)=>{
            console.log(err); 
        })
    },[])
  return (
    <div>
            <div className='bg-no-repeat bg-cover w-full bg-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] relative hero' style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 10)), url(${movie?.image})` }}>
            <div className='absolute gap-10 flex items-center justify-center m-6'>
            <div className='group relative'>
              <div className='overflow-hidden rounded-2xl w-30 sm:w-40 md:w-50 lg:w-60'>
                  <img src={movie?.image} className='object-cover hover:scale-125 duration-500 cursor-pointer'/>
                  <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white flex  items-center text-lg gap-1'>
                <FaCirclePlay/>
                  <p>Trailer</p>
                  </div>
              </div>
          </div>
          <div className='flex flex-col gap-4 justify-center'>
            <h1 className='text-white text-4xl font-bold'>{movie?.title}</h1>
            <div className='flex gap-2'>
            <p className='px-3 bg-white rounded-md text-black'>{movie?.language}</p>
            </div>
            <p className='text-white px-1'>{movie?.duration} min. {movie?.genre} . {movie?.releaseDate}</p>
          </div>
            </div>
            <div className='absolute top-1 right-1'>
                <button className="btn btn-circle" onClick={()=>document.getElementById('my_modal_2').showModal()}><IoAddOutline className='h-5 w-5'/></button>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                  <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                  <div>
        <label htmlFor="startDate" className="block text-sm/6 font-medium ">
          Show Date
        </label>
        <div className="mt-2">
          <input
            id="startDate"
            name="startDate"
            type="date"
            required
            autoComplete="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
          onChange={handleChange}/>
        </div>
      </div>
      <div>
        <label htmlFor="startTime" className="block text-sm/6 font-medium ">
          Show Time
        </label>
        <div className="mt-2">
          <input
            id="startTime"
            name="startTime"
            type="time"
            required
            autoComplete="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
          onChange={handleChange}/>
        </div>
      </div>
                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
          </div>
          <div className='mt-4'>
            <h1 className='text-xl font-bold mb-3'>About the movie</h1>
            <p>{movie?.description}</p>
          </div>
    </div>
  )
}

export default SellerMovieDetailspage
