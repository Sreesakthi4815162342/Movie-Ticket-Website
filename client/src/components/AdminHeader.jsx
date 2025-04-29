import React from 'react'
import ThemeToggle from './ThemeToggle'
import Search from './Search'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../services/userApi'
import { persistor } from '../redux/store'
import { clearUser } from '../redux/features/userSlice'
import { CgProfile } from 'react-icons/cg'

function AdminHeader() {
    const userData=useSelector((state)=>state.user)
      const dispatch=useDispatch()
      const navigate=useNavigate()
      const handleLogout=()=>{
        try {
          userLogout().then((res)=>{
            if(userData.role=="admin")
            {
              localStorage.removeItem("token");
              navigate("/")
            }else {
              localStorage.removeItem("token")
              navigate("/")
            }
            persistor.purge()
            dispatch(clearUser())
          })
        } catch (error) {
          console.log(error)
        }
      }
      
  return (
    <div>
       <div className="navbar bg-base-100 px-4 shadow-md">
      <div className='flex items-center gap-2'>
        <ThemeToggle/>
      <Search/>
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
            </div>
      </div>
    </div>
    </div>
  )
}

export default AdminHeader
