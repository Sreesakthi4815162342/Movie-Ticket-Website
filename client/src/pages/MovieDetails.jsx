import React, { useEffect, useState } from 'react'
import Review from '../components/Review';
import Background from '../components/Background';
import Aboutmovie from '../components/Aboutmovie';
import Recommended from '../components/Recommended';
import { getMovie, getRecommendedMovies } from '../services/movieApi';
import { useParams } from 'react-router-dom';
import { getReviews } from '../services/reviewApi';

function Moviedetails() {
  const {id}=useParams();
  const [data,setData]=useState({})
  const [reviews, setReviews] = useState([]);
  const [movies,setMovies]=useState([])
  useEffect(()=>{
      getMovie(id).then((res)=>{
        setData(res?.data)
      }).catch((err)=>{
        console.log(err);
      })


      getReviews(id).then((res)=>{
        setReviews(res?.data)
      }).catch((err)=>{
        console.log(err);
        
      })

      getRecommendedMovies().then((res)=>{ 
        setMovies(res?.data)
    }).catch((err)=>{
        console.log(err); 
    })
    },[id])

    const updateReviews=(newReview)=>{
      setReviews((prev)=>[newReview, ...prev])
    }

  return (
    <div>
        <Background item={data} reviews={reviews} updateReviews={updateReviews}/>
    <div className='flex flex-col lg:mx-30 md:mx-20 sm:mx-10 mx-5'>
      <div>
        <Aboutmovie item={data.description}/>
        </div>
      <div>
      <Review movieId={id} reviews={reviews} updateReviews={updateReviews}/>
      </div>
      <div className="carousel rounded-box gap-5 w-full">
        {
          movies.map((movie)=>(
            <Recommended item={movie} key={movie._id}/>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default Moviedetails
