import React, { useEffect, useState } from 'react'
import { createMovie, getMovies } from '../../services/movieApi';
import Movie from '../../components/Movie';
import { IoAddOutline } from 'react-icons/io5';
import { toast } from 'sonner';

function AdminMoviespage() {
    const [movies,setMovies]=useState([])
    const [data,setData]=useState({title:"",description:"",genre:"",duration:"",language:"",releaseDate:"",image:null})
          const [selectedgenres,setSelectedgenres]=useState('')
        
          useEffect(() => {
            // Fetch movies whenever the genre is selected or changed
            if (selectedgenres) {
             getMovies(selectedgenres).then((res) => {
                console.log(res.data.movies);
                setMovies(res.data.movies);
              });
            } else {
              // If no genre is selected, fetch all movies
              getMovies().then((res) => {
                setMovies(res.data.movies);
              });
            }
          }, [selectedgenres]);

          const handleSubmit=(event)=>{
                  event.preventDefault();
          
                  const formData=new FormData();
                  Object.entries(data).forEach(([key, value])=>{
                      formData.append(key, value);
                  })
                  toast.success("submitted")
                  createMovie(formData).then((res)=>{
                      console.log(res);
                    toast.success(res?.data)
                  }).catch((err)=>{
                    toast.error(err?.response?.data?.error)
                  })
                }
        
          const handleChange=(e)=>{
            const genre=e.target.value
            setSelectedgenres(genre)
          }

          const handleMovie=(event)=>{
            const {name, value, files}=event.target;
            if(name ==='image'){
                setData((prev)=>({...prev,[name]:files[0]}))
            }else{
                setData((prev)=>({...prev,[name]:value}))
            }
          }
        
        const genres=["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller","Adventure","Crime"]
  return (
    <div>
        <div className='flex justify-end'>
                <button className="btn btn-circle" onClick={()=>document.getElementById('my_modal_2').showModal()}><IoAddOutline className='h-5 w-5'/></button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block text-sm/6 font-medium ">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    autoComplete="text"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleMovie}/>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm/6 font-medium ">
                  Description
                </label>
                <div className="mt-2">
                <textarea className="textarea w-full" id="description" name="description" required onChange={handleMovie}></textarea>
                </div>
              </div>
        
              <div>
                <label htmlFor="genre" className="block text-sm/6 font-medium ">
                  Genre
                </label>
                <div className="mt-2">
                  <input
                    id="genre"
                    name="genre"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleMovie}/>
                </div>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm/6 font-medium ">
                  Duration
                </label>
                <div className="mt-2">
                  <input
                    id="duration"
                    name="duration"
                    type="number"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleMovie}/>
                </div>
              </div>


              <div>
                <label htmlFor="language" className="block text-sm/6 font-medium ">
                 Language
                </label>
                <div className="mt-2">
                  <input
                    id="language"
                    name="language"
                    type="text"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleMovie}/>
                </div>
              </div>

              <div>
                <label htmlFor="releaseDate" className="block text-sm/6 font-medium ">
                 Release Date
                </label>
                <div className="mt-2">
                  <input
                    id="releaseDate"
                    name="releaseDate"
                    type="date"
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2"
                    onChange={handleMovie}/>
                </div>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm/6 font-medium ">
                  Image
                </label>
                <div className="mt-2">
                <input type="file" className="file-input w-full" id="image" name="image" required onChange={handleMovie}/>
                </div>
              </div>
        
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
                </div>
    <div className='m-5'>
          <select onChange={handleChange} value={selectedgenres} className="select select-sm w-26 bg-info">
      <option value="">All</option>
      {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
    </select>
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-5'>
    { movies?.map((movie) => (
        <Movie item={movie} key={movie._id} role={"admin"}/>
    ))}
                 </div>
          
          
        </div>
  )
}

export default AdminMoviespage
