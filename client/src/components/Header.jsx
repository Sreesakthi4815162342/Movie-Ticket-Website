import React, { useState } from 'react'
import Search from './Search'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Updateprofile, userLogout } from '../services/userApi'
import { persistor } from '../redux/store'
import { clearUser } from '../redux/features/userSlice'
import ThemeToggle from './ThemeToggle'
import { CgProfile } from "react-icons/cg";
import { SiShowtime } from "react-icons/si";
import { toast } from 'sonner'

function Header() {
  const [data,setData]=useState({})
  const userData=useSelector((state)=>state.user)
  const dispatch=useDispatch()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      if (value.trim() === "") {
        const { [name]: _, ...rest } = prev;
        return rest;
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

      const handleSubmit=(event)=>{
        event.preventDefault();
        toast.success("submitted")
        Updateprofile(data).then((res)=>{
          console.log(res);
          toast.success(res?.data?.message)
        }).catch((err)=>{
          toast.error(err?.response?.data?.error)
        })
      }
  const handleLogout=()=>{
    try {
      userLogout().then((res)=>{
        localStorage.removeItem("token");
        persistor.purge()
        dispatch(clearUser())
        navigate("/")
      })
    } catch (error) {
      console.log(error)
    }
  }
  const navigate=useNavigate()
  const gotoLogin=()=>{
    navigate("login")
  }

  return (
    <div className="navbar bg-base-100 px-4 shadow-md">
      <div className="navbar-start">
      <SiShowtime className='h-7 w-7 text-red-500'/>
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={()=>navigate("/")}><a>Home</a></li>
            <li onClick={()=>navigate("/movie")}><a href='movie'>Movies</a></li>
            <li onClick={()=>navigate("/theater")}><a>Theaters</a></li>
            <li onClick={()=>navigate("/bookings")}><a>MyBookings</a></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li onClick={()=>navigate("/")}><a>Home</a></li>
            <li onClick={()=>navigate("/movie")}><a href='movie'>Movies</a></li>
            <li onClick={()=>navigate("/theater")}><a>Theaters</a></li>
            <li onClick={()=>navigate("/bookings")}><a>MyBookings</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
      <Search/>
        <ThemeToggle/>
      {userData.user && Object.keys(userData.user).length > 0 ?
      <div>
      
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
      <CgProfile className='h-6 w-6'/>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li><div className=" bg-base-100 shadow-sm flex flex-col">
          <CgProfile className='h-6 w-6'/>
          <p>{userData?.user?.name}</p>
</div></li>
        <li>
          <a className="justify-between" onClick={()=>document.getElementById('my_modal_2').showModal()}>
           Update profile
          </a>
        </li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
      </div>  :<button className="btn btn-info text-white" onClick={gotoLogin}>Join us</button>}
      
      </div>
      <dialog id="my_modal_2" className="modal">
  <div className="modal-box">
  <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
  <div>
        <label htmlFor="email" className="block text-sm/6 font-medium ">
          Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
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

  )
}

export default Header
