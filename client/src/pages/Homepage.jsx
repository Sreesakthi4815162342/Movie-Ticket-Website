import React, { useEffect, useState } from 'react'
import {  getRecommendedMovies } from '../services/movieApi'
import Recommended from '../components/Recommended'
import Banner from '../components/Banner'

function Homepage() {
  const [movies,setMovies]=useState([])

    useEffect(()=>{
        getRecommendedMovies().then((res)=>{ 
            setMovies(res?.data)
        }).catch((err)=>{
            console.log(err); 
        })
    },[])
  return (
    <div>
      <Banner/>
      <div className='my-10'>
      <h1 className='text-2xl font-bold mb-5'>Recommended</h1>
      <div>
      <div className="carousel rounded-box gap-5 w-full">
        {
          movies.map((movie)=>(
            <Recommended item={movie} key={movie._id}/>
          ))
        }
      </div>
      </div>
      </div>
    </div>
  )
}

export default Homepage
