import React, { useEffect, useState } from 'react'
import { getMovies } from '../services/movieApi'
import Movie from '../components/Movie'
import axios from 'axios'

function Moviespage() {
  const [movies,setMovies]=useState([])
  const [selectedgenres,setSelectedgenres]=useState('')

  useEffect(() => {
    if (selectedgenres) {
     getMovies(selectedgenres).then((res) => {
        console.log(res.data.movies);
        setMovies(res.data.movies);
      });
    } else {
      getMovies().then((res) => {
        setMovies(res.data.movies);
      });
    }
  }, [selectedgenres]);

  const handleChange=(e)=>{
    const genre=e.target.value
    setSelectedgenres(genre)
  }

const genres=["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller","Adventure","Crime"]
  return (
    <div>
<div className='m-5'>
      <select onChange={handleChange} value={selectedgenres} className="select select-sm w-26 bg-info">
  <option value="">All</option>
  {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
</select>
</div>
<div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-5'>
{ movies?.map((movie) => (
    <Movie item={movie} key={movie._id} />
))}
             </div>
      
      
    </div>
  )
}

export default Moviespage
