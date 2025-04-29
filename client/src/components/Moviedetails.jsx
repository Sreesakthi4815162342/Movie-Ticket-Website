import React from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import Review from './Review';

function Moviedetails() {
  return (
    <div>
    <div className='bg-[url(https://assets-in.bmscdn.com/discovery-catalog/events/et00431676-wtneafsqew-landscape.jpg)] bg-no-repeat bg-cover w-full bg-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] relative hero'>
      <div className='absolute gap-10 flex'>
      <div className='group relative overflow-hidden'>
        <div className='overflow-hidden rounded-2xl relative'>
            <img src="https://assetscdn1.paytm.com/images/cinema/Officer-on-duty--Gallery-31344510-c6c9-11ef-a259-4b3c6d26f4a9.jpg" className='h-[150px] sm:h-[200px] md:h-[250px] lg:h-[350px] hover:scale-125 duration-500'/>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white flex  items-center text-lg gap-1'>
            <FaCirclePlay />
            <p>Trailer</p>
            </div>
        </div>
    </div>
    <div className='flex flex-col gap-4 justify-center'>
      <h1 className='text-white text-4xl font-bold'>Officer On Duty</h1>
      <div className='flex gap-2'>
      <p className='px-3 bg-white rounded-md'>2D ,Imax 2D</p>
      <p className='px-3 bg-white rounded-md'>Malayalam</p>
      </div>
      <p className='text-white px-1'>2h 30m . Action, Crime . UA13+ . 30 March, 2025</p>
      <div>
      <button className="btn btn-info btn-lg">Book tickets</button>
      </div>
    </div>
      </div>
    </div>
    <div className='flex flex-col mx-30'>
      <div className='my-10'>
      <h1 className='text-2xl font-bold'>About the movie</h1>
      <p className='mt-5 '>Harishankar, a demoted Circle Inspector, takes on a fake gold jewellery case that spirals into a deadly game with vengeful criminals. As danger mounts, he must navigate treacherous twists that threaten both his career and life.</p>
      <div className="divider"></div>
      </div>
      <div>
      <Review/>
      </div>
    </div>
    </div>
  )
}

export default Moviedetails
