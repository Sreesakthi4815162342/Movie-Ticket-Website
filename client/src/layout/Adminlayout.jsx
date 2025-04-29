import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/AdminHeader'
import { IoMdClose } from 'react-icons/io'
import { IoMenuSharp } from 'react-icons/io5'

function Adminlayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  return (
    <div className='flex min-h-screen '>
         <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar}/>
      <div className='flex flex-col flex-1 min-h-screen md:ml-64'>
      <div className="p-4 flex fixed top-0 w-full right-0 shadow-md z-10">
          <button
            className="btn btn-ghost md:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <IoMdClose className="h-5 w-5" /> : <IoMenuSharp className="h-5 w-5" />}
          </button>
          <div className='ms-auto'>
          <AdminHeader />
          </div>
        </div>
      <div className='flex-1 p-6 mt-20'>
      <Outlet/>
      </div>
    </div>
    </div>
  )
}

export default Adminlayout
