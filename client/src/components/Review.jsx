import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getReviews } from '../services/reviewApi';
import { CgProfile } from 'react-icons/cg';

function Review() {
  const {id}=useParams();
  const [reviews,setReviews]=useState([])
  useEffect(() => {
      getReviews(id)
        .then((res) => {
          setReviews(res.data); 
        })
        .catch((err) => {
          console.log(err);
        })
  }, [id]);


  return (
    <div>
        <h1 className='text-2xl font-bold'>Top reviews</h1>
      <div>
      <div className="carousel carousel-center rounded-box space-x-4 p-4 w-full">  
      {
        reviews.map((review)=>(
          <div className="carousel-item" key={review._id}>
  <div className="w-96 bg-base-100 card-lg shadow-sm border border-black rounded-md">
  <div className="card-body">
    <div className='flex  items-center gap-4'>
  <div className="avatar">
  <CgProfile className='h-6 w-6'/>
  <p className='ms-3'>{review?.user?.name}</p>
</div>
<p></p>
</div>
<div className='flex items-center gap-5'>
<div className="rating rating-xs">
  {[1, 2, 3, 4, 5].map((star) => (
    <input
      key={star}
      type="radio"
      name={`rating-${review._id}`}
      className="mask mask-star bg-orange-400"
      checked={star === review.rating}
      readOnly
    />
  ))}
</div>
</div>
    <p>{review.comment}</p>
  </div>
</div>
  </div>  
        ))
      }
          
</div>
</div>
<div className="divider"></div>
    </div>
  )
}

export default Review
