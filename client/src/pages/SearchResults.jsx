import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { getMovies } from '../services/movieApi'

function SearchResults() {
    const location = useLocation()
    const navigate=useNavigate()
  const query = new URLSearchParams(location.search).get("query")?.toLowerCase()
  const [filteredMovies, setFilteredMovies] = useState([])

  const gotoMoviedatails=(id)=>{
    navigate(`/moviedetails/${id}`)  
}

  useEffect(() => {
    getMovies()
      .then((res) => {
        const movies = res.data.movies ? res.data.movies : []
        const results = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query)
          )
        setFilteredMovies(results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [query])
  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
    {filteredMovies.length === 0 ? (
      <p>No movies found matching your search.</p>
    ) : (
      <div className='grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-5'>
        {filteredMovies.map((movie) => (
          <div className='group relative overflow-hidden'>
          <div className='overflow-hidden flex justify-center rounded-xl h-40 sm:h-50 md:h-60 lg:h-70'>
              <img src={movie.image} alt={movie.title}  className='object-cover hover:scale-125 duration-500 cursor-pointer h-full w-full' onClick={()=>gotoMoviedatails(movie._id)} />
          </div>
          <div className='mt-3'>
              <p className='font-bold'>{movie.title}</p>
              <p className='text-sm text-slate-700'>{movie.genre}</p>
          </div>
      </div>
        ))}
      </div>
    )}
    
  </div>
  )
}

export default SearchResults
