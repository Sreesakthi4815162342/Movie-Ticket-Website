import React, { useEffect, useState } from 'react'
import { FaUsers } from "react-icons/fa";
import { GiTheater } from "react-icons/gi";
import { MdLocalMovies } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteUser, getTotalUsers, getUsers } from '../services/userApi';
import { getTotalTheaters } from '../services/theaterApi';
import { getTotalMovies } from '../services/movieApi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { toast } from 'sonner';

function AdmindashBoard() {
  const [totalusers,setTotalusers]=useState('')
  const [totaltheaters,setTotaltheaters]=useState('')
  const [totalmovies,setTotalmovies]=useState('')
  const [users,setUsers]=useState([])


  const deleteuser=(id)=>{
    deleteUser(id).then((res)=>{
      getUsers().then((res)=>{
        setUsers(res.data)
        console.log(res);
      }).catch((err)=>{
        console.log(err); 
      })
      console.log(res.data);
      toast.success(res.data)
      
    }).catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getTotalUsers().then((res)=>{
      setTotalusers(res.data.totalUsers)
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    })

    getTotalTheaters().then((res)=>{
      setTotaltheaters(res.data.totalTheaters)
      console.log(res);
      
    }).catch((err)=>{
      console.log(err); 
    })

    getTotalMovies().then((res)=>{
      setTotalmovies(res.data.totalMovies)
      console.log(res);
    }).catch((err)=>{
      console.log(err); 
    })

    getUsers().then((res)=>{
      setUsers(res.data)
      console.log(res);
    }).catch((err)=>{
      console.log(err); 
    })


  },[])
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Dash Board</h1>
    <div className='grid grid-cols-3 gap-2 h-40'>
      <div className='bg-gradient-to-r from-teal-400 to-blue-500 text-white flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg '>
      <FaUsers className='w-8 h-8'/>
        <p>Total Users</p>
        <p>{totalusers}</p>
      </div>
      <div className='bg-gradient-to-r from-orange-500 text-white to-red-500 ... flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg'>
      <GiTheater className='w-8 h-8'/>
      <p>Total Theaters</p>
      <p>{totaltheaters}</p>
      </div>
      <div className='bg-gradient-to-r from-yellow-500 text-white to-orange-500 ... flex flex-col justify-center items-center rounded border border-indigo-200 shadow-lg'>
      <MdLocalMovies className='w-8 h-8'/>
      <p>Total Movies</p>
      <p>{totalmovies}</p>
      </div>
    </div>
    <div className="overflow-x-auto mt-4">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
{
  users.map((user)=>(
<tr>
  <td>{user.name}</td>
  <td>{user.email}</td>
  <td>{user.role}</td>
  <td><div className="dropdown dropdown-left ">
    <button className="btn btn-square btn-ghost rounded-full" tabIndex={0}>
    <BsThreeDotsVertical/>
      </button>
    <ul tabIndex={0} className="dropdown-content menu bg-base-100 w-40 rounded-box z-1 p-2 shadow-sm">
      <li><a onClick={()=>deleteuser(user._id)}><MdDelete className='text-red-500 w-5 h-5'/>Delete User</a></li>
    </ul>
  </div></td>
</tr>
  ))
  
}
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default AdmindashBoard
