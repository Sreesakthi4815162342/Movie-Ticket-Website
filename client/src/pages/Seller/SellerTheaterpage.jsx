import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { GiTheater } from 'react-icons/gi';
import { FaLocationDot } from 'react-icons/fa6';
import { ImUserTie } from 'react-icons/im';
import { getShowbyTheater } from '../../services/showsApi';
import { getTheater, updateTheater } from '../../services/theaterApi';
import { MdEdit } from "react-icons/md";
import { toast } from 'sonner';

function SellerTheaterpage() {
  const [shows,setShows]=useState([])
  const [data,setData]=useState({})
  const [theater,setTheater]=useState({})

  const userData=useSelector((state)=>state.user)
  const id=userData.user?.theater?._id
  
  
  

  
    
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
        updateTheater(formData,id).then((res)=>{
            console.log(res);
          toast.success(res?.data?.message)
          getTheater(id).then((res)=>{
            setTheater(res?.data)
            console.log(res.data);
            
          }).catch((err)=>{
            console.log(err);
          })
        }).catch((err)=>{
          toast.error(err?.response?.data?.error)
        })
      }
   useEffect(()=>{
    getTheater(id).then((res)=>{
      setTheater(res?.data)
      console.log(res.data);
      
    }).catch((err)=>{
      console.log(err);
    })
  
               getShowbyTheater(id).then((res)=>{
                  setShows(res.data)
                }).catch((err)=>{
                  console.log(err);
                })
              },[])
  
              const groupedByMovie = shows.reduce((acc, show) => {
                  const movieId = show?.movie?._id;
                  
                  if (!acc[movieId]) {
                    acc[movieId] = {
                      movie: show.movie,
                      shows: []
                    };
                  }
                
                  acc[movieId].shows.push(show);
                  return acc;
                }, {});
          
                const moviesArray = Object.values(groupedByMovie);
  return (
    <div>
      <div className='relative'>
              <img
            src={theater.image}
            className=" rounded-lg shadow-2xl object-cover  h-80 w-full" />
            <div className="dropdown dropdown-left absolute top-1 right-1">
        <div className='flex justify-end'>
                <button className="btn btn-circle" onClick={()=>document.getElementById('my_modal_2').showModal()}><MdEdit/></button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm/6 font-medium ">
                  Theater Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={theater.name}
                    autoComplete="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                  onChange={handleChange}/>
                </div>
              </div>
        
              <div>
                <label htmlFor="location" className="block text-sm/6 font-medium ">
                  Location
                </label>
                <div className="mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    defaultValue={theater.location}
                    autoComplete="text"
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
                <label htmlFor="facilities" className="block text-sm/6 font-medium ">
                  Facilities
                </label>
                <div className="mt-2">
                <textarea className="textarea w-full" id="facilities" name="facilities"  onChange={handleChange} defaultValue={theater.facilities}></textarea>
                </div>
              </div>
        
              <div>
                <label htmlFor="totalSeats" className="block text-sm/6 font-medium ">
                  Total seats
                </label>
                <div className="mt-2">
                  <input
                    id="totalSeats"
                    name="totalSeats"
                    type="number"
                    defaultValue={theater.name}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>
        
              <div>
                <label htmlFor="rows" className="block text-sm/6 font-medium ">
                  Rows
                </label>
                <div className="mt-2">
                  <input
                    id="rows"
                    name="rows"
                    type="number"
                    defaultValue={theater.rows}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>
        
              <div>
                <label htmlFor="columns" className="block text-sm/6 font-medium ">
                  Coloumns
                </label>
                <div className="mt-2">
                  <input
                    id="columns"
                    name="columns"
                    type="number"
                    defaultValue={theater.columns}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleChange}/>
                </div>
              </div>
        
              <div>
                <label htmlFor="owner" className="block text-sm/6 font-medium ">
                  Owner
                </label>
                <div className="mt-2">
                  <input
                    id="owner"
                    name="owner"
                    type="text"
                    defaultValue={theater.owner}
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
            <div className='grid grid-cols-3 my-5 gap-2'>
              <div className='bg-white text-black flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg p-3'>
              <GiTheater className='w-5 h-5'/>
                  <p className='text-center'>{theater.name}</p>
              </div>
              <div className='bg-white text-black flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg p-3'>
              <FaLocationDot className='w-5 h-5' />
                  <p className='text-center'>{theater.location}</p>
              </div>
              <div className='bg-white text-black flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg p-3'>
              <ImUserTie/>
              <p className='text-center'>{theater.owner}</p>
              </div>
            </div>
            <div>
        <h1 className='text-xl font-bold mb-5'>Now Streaming</h1>
      <div className="carousel gap-3">
      {moviesArray
    .filter((show) => show?.movie && show?.movie?.image) // Filter shows with valid movie and image
    .map((show) => (
      <div className="carousel-item" key={show.movie._id}>
        <img
          src={show?.movie?.image}
          alt="Movie"
          className="h-60 rounded-md"
        />
      </div>
    ))}
</div>
</div>
    </div>
  )
}

export default SellerTheaterpage
