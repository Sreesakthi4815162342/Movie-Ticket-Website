import React, { useEffect, useState } from 'react'
import { getShowsbyTheaterAndDate, getShowsDates } from '../../services/showsApi';
import { useSelector } from 'react-redux';
import Dateselector from '../../components/Dateselector';
import SellerAvailableshows from '../../components/SellerAvailableshows';

function SellerShowpage() {
  const userData=useSelector((state)=>state.user)
  const id=userData.user?.theater?._id
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
            const validShows = res?.data?.filter(show => show.movie)
            setshowtimes(validShows);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [id, selectedDate]);
  return (
    <div>
    <div className='mx-5'>
   <div>
   <Dateselector Dates={Dates} 
     selectedDate={selectedDate}
     onDateChange={setSelectedDate}/>
   </div>
   <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
   {
    showtimes
      .filter((show) => show.movie)
      .map((show) => (
        <SellerAvailableshows item={show} key={show._id} />
      ))
  }
   </div>
</div>
</div>
  )
}

export default SellerShowpage
