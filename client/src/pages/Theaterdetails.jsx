import React, { useEffect, useState } from 'react'
import Dateselector from '../components/Dateselector'
import AvailableShows from '../components/AvailableShows'
import {  getShowsbyTheaterAndDate, getShowsDates } from '../services/showsApi'
import { useParams } from 'react-router-dom'

function Theaterdetails() {
    const {id}=useParams()
    const [showtimes, setshowtimes] = useState([]);
    const [Dates,setDates]=useState([])
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  useEffect(()=>{
    getShowsDates(id).then((res)=>{
      const sortedDates = [...new Set(res.data)].sort((a, b) => new Date(a) - new Date(b));
        setDates(sortedDates);
        if (sortedDates.length > 0) {
          setSelectedDate(sortedDates[0]); // ✅ set first date as default
        }


    }).catch((err)=>{
      console.log(err);
    })
      },[id])

      useEffect(() => {
        if (selectedDate) {
          getShowsbyTheaterAndDate(id, selectedDate)
            .then((res) => {
              setshowtimes(res?.data || []);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, [id, selectedDate]);

      const groupedByMovie = showtimes.reduce((acc, show) => {
        const movieId = show?.movie?._id;
        
        if (!acc[movieId]) {
          acc[movieId] = {
            movie: show.movie,
            shows: []
          };
        }
      
        acc[movieId].shows.push(show);
        return acc;
      }, {});

      const moviesArray = Object.values(groupedByMovie);
  return (
    <div>
         <div className='mx-5'>
        <div>
        <Dateselector Dates={Dates} // Dates from available showtimes
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}/>
        </div>
        <div className='flex flex-col gap-2'>
          {
            moviesArray.map((group)=>(
              <AvailableShows item={group} key={group?.movie?._id}/>
            ))
            
          }
        </div>
</div>
    </div>
  )
}

export default Theaterdetails
