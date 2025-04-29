import React from 'react'

function Aboutmovie({item}) {
  return (
    <div>
      <div className='my-10'>
      <h1 className='text-2xl font-bold'>About the movie</h1>
      <p className='mt-5 '>{item}</p>
      <div className="divider"></div>
      </div>
    </div>
  )
}

export default Aboutmovie
