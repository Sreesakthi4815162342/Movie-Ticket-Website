import React, { useEffect, useState} from 'react'
import { MdOutlineSlideshow } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { getShowbyTheater } from '../services/showsApi';
import { getBookings } from '../services/bookingApi';

function SellerdashBoard() {
  const [showslength,setshowslength]=useState("")
  const [bookings,setBookings]=useState([])
  const userData=useSelector((state)=>state.user)
  const id=userData?.user?.theater?._id

  useEffect(()=>{
               getShowbyTheater(id).then((res)=>{
                const allShows = res.data || [];
                setshowslength(allShows.length)
                }).catch((err)=>{
                  console.log(err);
                })

                getBookings(id).then((res)=>{
                  console.log(res?.data);
                  setBookings(res?.data)
                }).catch((err)=>{
                  console.log(err);
                })
              },[])

  
  return (
    <div>
        <h1 className='text-2xl font-bold mb-4'>Dash Board</h1>
            <div className='grid grid-cols-2 gap-2 h-40'>
              <div className='bg-gradient-to-r from-teal-400 to-blue-500 text-white flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg '>
              <MdOutlineSlideshow className='h-5 w-5'/>
                <p>Total Shows</p>
                <p>{showslength}</p>
              </div>
              <div className='bg-gradient-to-r from-orange-500 text-white to-red-500 ... flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg'>
              <FaTicketAlt className='h-5 w-5'/>
              <p>Total Bookings</p>
              <p>{bookings.length}</p>
              </div>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>movie</th>
                  </tr>
                </thead>
                <tbody>
            {
              bookings.map((booking)=>(
            <tr>
              <td>{booking?.user?.name}</td>
              <td>{booking?.user?.email}</td>
              <td>{booking?.show?.movie?.title}</td>
            </tr>
              ))
              
            }
                  
                </tbody>
              </table>
            </div>
    </div>
  )
}

export default SellerdashBoard
