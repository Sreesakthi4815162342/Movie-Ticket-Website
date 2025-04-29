import React, { useEffect, useState } from 'react'
import { createTheater, getTheaters } from '../../services/theaterApi'
import AdminTheater from '../../components/AdminTheater'
import { IoAddOutline } from "react-icons/io5";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function AdminTheaterspage() {
  const navigate=useNavigate()
    const [theaters,setTheaters]=useState([])
    const [data,setData]=useState({name:"",location:"",image:null,facilities:"",totalSeats:"",rows:"",columns:"",owner:"",email:"",password:""})
    
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
            formData.append(key, value);
        })
        toast.success("submitted")
        createTheater(formData).then((res)=>{
            console.log(res);
          toast.success(res?.data)
          navigate("/admin/admintheaters")
        }).catch((err)=>{
          toast.error(err?.response?.data?.error)
        })
      }
      
        useEffect(()=>{
          getTheaters().then((res)=>{
            setTheaters(res?.data)
          }).catch((err)=>{
            console.log(err);
          })
        },[])
  return (
    <div>
        <div className='flex justify-end'>
        <button className="btn btn-circle" onClick={()=>document.getElementById('my_modal_2').showModal()}><IoAddOutline className='h-5 w-5'/></button>
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
            required
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
            required
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
        <input type="file" className="file-input w-full" id="image" name="image" required onChange={handleChange}/>
        </div>
      </div>

      <div>
        <label htmlFor="facilities" className="block text-sm/6 font-medium ">
          Facilities
        </label>
        <div className="mt-2">
        <textarea className="textarea w-full" id="facilities" name="facilities" required onChange={handleChange}></textarea>
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
            required
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
            required
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
            required
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
            required
            autoComplete="text"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
            onChange={handleChange}/>
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm/6 font-medium ">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
            onChange={handleChange}/>
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm/6 font-medium ">
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="password"
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
    <div className='m-5 grid grid-rows sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
{
        theaters.map((theater)=>(     
<AdminTheater item={theater} key={theater._id}/>
        ))
      }
      </div>
    </div>
  )
}

export default AdminTheaterspage
