import React, { useEffect, useState } from 'react'
import Availabletheaters from '../components/Availabletheaters'
import {  getShowsByMovieAndDate, getShowsDatesByMovie } from '../services/showsApi'
import { useParams } from 'react-router-dom'
import Dateselector from '../components/Dateselector'

function Ticketdetails() {
  const {id}=useParams()
  const [showtimes,setshowtimes]=useState([])
  const [Dates,setDates]=useState([])
   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  useEffect(()=>{
     getShowsDatesByMovie(id).then((res)=>{
      const sortedDates = res.data.sort((a, b) => new Date(a) - new Date(b));
      setDates(sortedDates);

      if (sortedDates.length > 0) {
        setSelectedDate(sortedDates[0]); // ✅ Set first date as default
      }

        }).catch((err)=>{
          console.log(err);
        })

      },[id])

      useEffect(() => {
        if (selectedDate) {
          getShowsByMovieAndDate(id, selectedDate)
            .then((res) => {
              setshowtimes(res?.data || [])
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }, [id, selectedDate])

      const groupedByTheater = showtimes.reduce((acc, show) => {
        const theaterId = show.theater._id
    
        if (!acc[theaterId]) {
          acc[theaterId] = {
            theater: show.theater, // full theater info
            shows: [] // all showtimes for this theater
          }
        }
    
        acc[theaterId].shows.push(show)
        return acc
      }, {})
    
      const theatersArray = Object.values(groupedByTheater)

      return(
    <div className='mx-5'>
        <div>
            <h1 className='text-3xl font-semibold'></h1>
            <div className="divider"></div>
        </div>

        <div>
        <Dateselector Dates={Dates} // Dates from available showtimes
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}/>
        <div className="divider"></div>
        </div>
         <div className='flex flex-col gap-2'>
         {theatersArray.map((group) => (
          <Availabletheaters
            key={group.theater._id}
            item={group}
          />
        ))}
      </div>
</div>
  )
}

export default Ticketdetails
