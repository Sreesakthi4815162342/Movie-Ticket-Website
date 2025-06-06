import React from 'react'
import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate=useNavigate()
  const gotoUser=()=>{
    navigate('/user')
  }
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary" onClick={gotoUser}>Get Started</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default LandingPage
