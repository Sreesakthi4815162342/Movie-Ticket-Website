import React, { useEffect, useState } from 'react'
import { deleteTheater, getTheater } from '../../services/theaterApi'
import { useNavigate, useParams } from 'react-router-dom'
import { GiTheater } from "react-icons/gi";
import { FaLocationDot } from 'react-icons/fa6';
import { ImUserTie } from "react-icons/im";
import { getShowbyTheater } from '../../services/showsApi';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { toast } from 'sonner';

function AdminTheaterdetails() {
  const navigate=useNavigate()
    const {id}=useParams()
    const [shows,setShows]=useState([])
    const [theater,setTheater]=useState({})


    const DeleteTheater=()=>{
        deleteTheater(id).then((res)=>{
            toast.success(res.data)
            navigate("/admin/admintheaters")
        }).catch((err)=>{
            toast.error(err.message)
        })
    }
    

    useEffect(()=>{
              getTheater(id).then((res)=>{
                setTheater(res.data)
              }).catch((err)=>{
                console.log(err);
              })

             getShowbyTheater(id).then((res)=>{
                setShows(res.data)
                console.log(res.data);
                
              }).catch((err)=>{
                console.log(err);
              })
            },[])

            const groupedByMovie = shows.reduce((acc, show) => {
              if(!show.movie || !show.movie._id) return acc;
                const movieId = show.movie._id;
                
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
      <div className="dropdown dropdown-left absolute top-0 right-0">
  <button className="btn btn-square btn-ghost rounded-full" tabIndex={0}>
  <BsThreeDotsVertical className='text-white'/>
    </button>
  <ul tabIndex={0} className="dropdown-content menu bg-base-100 w-40 rounded-box z-1 p-2 shadow-sm">
    <li><a onClick={DeleteTheater}><MdDelete className='text-red-500 w-5 h-5'/>Delete Theater</a></li>
  </ul>
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
        <ImUserTie className='w-5 h-5'/>
        <p className='text-center'>{theater.owner}</p>
        </div>
      </div>
      <div>
        <h1 className='text-xl font-bold mb-5'>Now Streaming</h1>
      <div className="carousel gap-3">
        {
            moviesArray.map((show)=>(
<div className="carousel-item">
    <img
      src={show.movie.image}
      alt="Movie" className='h-60 rounded-md' />
  </div>
            ))
        }
</div>
</div>
    </div>
  )
}

export default AdminTheaterdetails
