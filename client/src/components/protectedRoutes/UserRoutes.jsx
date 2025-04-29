import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../axios/axiosInstance'

function UserRoutes({children}) {
    const navigate=useNavigate()
    const [data,setData]=useState(null)
    const checkuser=()=>{
        axiosInstance.get("/user/fetchProfile",{withCredentials:true}).then((res)=>{
            if(res.data.name){
                setData(res.data)
            }else{
                navigate('/login')
            }
            
          }).catch((err)=>{
            navigate("/login")
            console.log(err)
          })
    }
    useEffect(()=>{
        checkuser()
    },[])
    return data ? children : null;
}

export default UserRoutes
