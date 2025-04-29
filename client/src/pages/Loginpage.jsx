import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../services/userApi'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { saveUser } from '../redux/features/userSlice'

function Loginpage() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const [data,setData]=useState({email:"",password:""})

  const handleChange=(event)=>{
setData(prev=>({...prev,[event.target.name]:event.target.value}))
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    toast.success("submitted")
    userLogin(data).then((res)=>{
      console.log(res);
      
      const role=res.data.existUser.role
      if(role=="admin"){
        dispatch(saveUser(res.data.existUser))
        localStorage.setItem("token",res?.data?.token)
        toast.success(res?.data?.message)
        navigate("/admin")
      }else if(role=="seller"){
        dispatch(saveUser(res.data.existUser))
        localStorage.setItem("token",res?.data?.token)
        toast.success(res?.data?.massage)
        navigate("/seller")
      }
      else{
        dispatch(saveUser(res.data.existUser))
        localStorage.setItem("token",res?.data?.token)
        toast.success(res?.data?.massage)
          navigate("/")
      }
   
    }).catch((err)=>{
      toast.error(err?.response?.data?.error)
      console.log(err);
      
    })
  }
  return (
    <div>
      <>

{/*
  This example requires updating your template:

  ```
  <html class="h-full bg-white">
  <body class="h-full">
  ```
*/}
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
     Login now !
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email2" className="block text-sm/6 font-medium">
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email2"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
          onChange={handleChange}/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password2" className="block text-sm/6 font-medium">
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password2"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
            onChange={handleChange}/>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Login
        </button>
      </div>
        <div className='flex justify-center'>
        Don't have an Account ? <Link to={"/signup"} className='text-blue-700'>Sign up</Link>
      </div>
      
      
    </form>
  </div>
</div>
</>
    </div>
  )
}

export default Loginpage
