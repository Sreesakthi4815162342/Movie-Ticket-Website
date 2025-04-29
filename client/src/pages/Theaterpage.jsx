import React, { useEffect, useState } from 'react'
import Theaters from '../components/Theaters'
import { getTheaters } from '../services/theaterApi'

function Theaterpage() {
  const [theaters,setTheaters]=useState([])
    

  
    useEffect(()=>{
      getTheaters().then((res)=>{
        setTheaters(res?.data)
      }).catch((err)=>{
        console.log(err);
      })
    },[])

  return (
    <div>
    <div className='m-5 grid grid-rows sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
{
        theaters.map((theater)=>(     
<Theaters item={theater} key={theater._id}/>
        ))
      }
      </div>
    </div>
  )
}

export default Theaterpage
