import React, { useEffect, useState } from 'react'
import { FaCirclePlay } from 'react-icons/fa6'
import { MdEdit } from "react-icons/md";
import { useParams } from 'react-router-dom'
import { deleteMovie, getMovie, updateMovie } from '../../services/movieApi'
import { MdDelete } from 'react-icons/md'
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from 'sonner';

function AdminMovieDetails() {
     const {id}=useParams()
      const [movie,setMovie]=useState({})
      const [data,setData]=useState({})

      

      const DeleteMovie=()=>{
        deleteMovie(id).then((res)=>{
            toast.success(res.data)
        }).catch((err)=>{
            toast.error(err)
        })
      }
    
      


    
        useEffect(()=>{
            getMovie(id).then((res)=>{
                setMovie(res.data)
            }).catch((err)=>{
                console.log(err); 
            })
        },[])

        const handleChange=(event)=>{
          const {name, value, files}=event.target;
          if(name ==='image'){
              setData((prev)=>({...prev,[name]:files[0]}))
          }else{
              setData((prev)=>({...prev,[name]:value}))
          }
        }

        const handleSubmit=(event)=>{
                event.preventDefault();
        
                const formData=new FormData();
                Object.entries(data).forEach(([key, value])=>{
                    if(value !== null && value !==""&& !(typeof value === 'string' && value.trim() ==='')){
                      formData.append(key, value);
                    }
                })
                toast.success("submitted")
                updateMovie(id,formData).then((res)=>{
                    console.log(res);
                  toast.success(res?.data?.message)
                }).catch((err)=>{
                  toast.error(err?.response?.data?.error)
                })
              }
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
                <div className="dropdown dropdown-left dropdown-center">
  <div tabIndex={0} role="button" className="btn m-1 btn-circle"><BsThreeDotsVertical /></div>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
  <li><a onClick={DeleteMovie}><MdDelete className='text-red-500 w-5 h-5'/>Delete Movie</a></li>
    <li><a onClick={()=>document.getElementById('my_modal_2').showModal()}><MdEdit className='h-5 w-5'/>Edit Movie</a></li>
    </ul>
            <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block text-sm/6 font-medium ">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm/6 font-medium ">
                  Description
                </label>
                <div className="mt-2">
                <textarea className="textarea w-full" id="description" name="description"  onChange={handleChange}></textarea>
                </div>
              </div>
        
              <div>
                <label htmlFor="genre" className="block text-sm/6 font-medium ">
                  Genre
                </label>
                <div className="mt-2">
                  <input
                    id="genre"
                    name="genre"
                    type="text"
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm/6 font-medium ">
                  Duration
                </label>
                <div className="mt-2">
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>


              <div>
                <label htmlFor="language" className="block text-sm/6 font-medium ">
                 Language
                </label>
                <div className="mt-2">
                  <input
                    id="language"
                    name="language"
                    type="text"
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>

              <div>
                <label htmlFor="releaseDate" className="block text-sm/6 font-medium ">
                 Release Date
                </label>
                <div className="mt-2">
                  <input
                    id="releaseDate"
                    name="releaseDate"
                    type="date"
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm/6 font-medium ">
                  Image
                </label>
                <div className="mt-2">
                <input type="file" className="file-input w-full" id="image" name="image"  onChange={handleChange}/>
                </div>
              </div>
        
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Update
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
              </div>
              <div className='mt-4'>
                <h1 className='text-xl font-bold mb-3'>About the movie</h1>
                <p>{movie?.description}</p>
              </div>
        </div>
  )
}

export default AdminMovieDetails
