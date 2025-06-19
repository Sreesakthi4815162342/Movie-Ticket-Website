import React, { useState } from 'react'
import { FaCirclePlay } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { createReviews, getReviews } from '../services/reviewApi';
import { toast } from 'sonner';

function Background({item}) {

  const {id}=useParams()
  const [reviews,setReviews]=useState([])
  const [data,setData]=useState({rating:1,comment:""})
  const handleChange=(event)=>{
    setData(prev=>({...prev,[event.target.name]:event.target.value}))
      }
  const navigate=useNavigate()
  const gotoSeats=(id)=>{
    navigate(`/ticket/${id}`)
  }
  const handleSubmit=(event)=>{
    event.preventDefault();
   createReviews(id,data).then((res)=>{
    toast.success(res.data);
    getReviews(id)
            .then((res) => {
              console.log(res);
              setReviews(res.data);
            })
            .catch((err) => {
              console.log(err);
            })
    document.getElementById('my_modal_1').close();
   }).catch((err)=>{
    toast.error(err)
   })
  }
  return (
   
      <div>
      <div className='bg-no-repeat bg-cover w-full bg-center h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] relative hero' style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 10)), url(${item?.image})` }}>
      <div className='absolute gap-10 flex items-center justify-center m-6'>
      <div className='group relative'>
        <div className='overflow-hidden rounded-2xl w-30 sm:w-40 md:w-50 lg:w-60 '>
            <img src={item?.image} className='object-cover hover:scale-125 duration-500 cursor-pointer'/>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white flex  items-center text-lg gap-1'>
          <FaCirclePlay/>
            <p>Trailer</p>
            </div>
        </div>
        <div className='flex justify-center mt-2  '>
        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Rate now</button>
        </div>
<dialog id="my_modal_1" className="modal">
  
  <div className="modal-box">
  <form method="POST" className="space-y-6" onSubmit={handleSubmit}>
    <div className='flex flex-col items-center gap-5'>
      <h1>How  was the Movie friend ?</h1>
      <div className="rating">
  {[1, 2, 3, 4, 5].map((val) => (
    <input
      key={val}
      type="radio"
      name="rating"
      value={val}
      className="mask mask-star"
      aria-label={`${val} star`}
      onChange={handleChange}
    />
  ))}
</div>
<p>Your Opinion Matters</p>
<textarea className="textarea" placeholder="Write your opinion" name="comment" onChange={handleChange}></textarea>

</div>
<div className='flex justify-center'>
<button type="submit" className="btn btn-primary mt-4" disabled={!data.comment}>Submit Review</button>
</div>
</form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </div>
    <div className='flex flex-col gap-4 justify-center'>
      <h1 className='text-white text-4xl font-bold'>{item?.title}</h1>
      <div className='flex gap-2'>
      <p className='px-3 bg-white rounded-md text-black'>{item?.language}</p>
      </div>
      <p className='text-white px-1'>{item?.duration} min. {item?.genre} . {item?.releaseDate}</p>
      <div>
      <button className="btn btn-info btn-lg" onClick={()=>gotoSeats(item._id)}>Book tickets</button>
      </div>
    </div>
      </div>
    </div>
    </div>
  )
}


export default Background
