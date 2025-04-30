import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from "react-icons/md";
import { deleteShow, updateShow } from '../services/showsApi';
import { toast } from 'sonner';

function SellerAvailableshows({item}) {
  if(!item?.movie){
    return null
  }
    const [data,setData]=useState({})
    const id=item._id
    const Deleteshow=()=>{
        deleteShow(id).then((res)=>{
            toast.success(res?.data)
            console.log(res);
        }).catch((err)=>{
            toast.error(err)
        })
    }

     const handleChange=(event)=>{
    setData(prev=>({...prev,[event.target.name]:event.target.value}))
      }
      const handleSubmit=(event)=>{
        event.preventDefault();
        toast.success("submitted")
        updateShow(id,data).then((res)=>{
          toast.success(res?.data?.massage)
        }).catch((err)=>{
          toast.error(err?.response?.data?.error)
        })
      }
  return (
    <div>
    <div className='grid w-full rounded-lg relative'>
    <div className='flex flex-col gap-2 items-center shadow-lg p-4 rounded-xl bg-white justify-between '>
  <div className='w-full'>
    <img
      src={item?.movie?.image}
      alt={item?.movie?.title}
      className="rounded shadow-2xl"
    />
  </div>
  <div>
    <p className=' mt-2 text-black'>{item?.movie?.title}</p>
  </div>
  <div className='mt-2'>
    <button
      key={item._id}
      className="bg-blue-500 py-2 px-6 rounded hover:bg-blue-600 transition"
    >
      {item?.startTime}
    </button>
  </div>
</div>
      <div className='absolute top-1 right-1'>
        <div className="dropdown dropdown-left absolute top-0 right-0">
          <button className="btn btn-square btn-ghost rounded-full" tabIndex={0}>
          <BsThreeDotsVertical/>
            </button>
          <ul tabIndex={0} className="dropdown-content menu bg-base-100 w-40 rounded-box z-1 p-2 shadow-sm">
            <li><a onClick={Deleteshow}><MdDelete className='text-red-500 w-5 h-5'/>Delete Show</a></li>
            <li><a onClick={()=>document.getElementById('my_modal_1').showModal()}><MdEdit className='w-5 h-5'/>Edit show</a></li>
            </ul>
                            <dialog id="my_modal_1" className="modal">
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
      </div>
    </div>
  )
}

export default SellerAvailableshows
