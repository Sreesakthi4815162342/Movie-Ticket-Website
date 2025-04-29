import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

function Userlayout() {
  return (
    <div className='flex flex-col' style={{height:"100vh"}}>
        <div>
      <Header/>
      </div>
      <div className='flex-1 m-5'>
      <Outlet/>
      </div>
      <div>
      <Footer/>
      </div>
    </div>
  )
}

export default Userlayout
