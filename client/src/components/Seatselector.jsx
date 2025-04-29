import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectseat } from '../redux/features/bookingSlice';

function Seatselector({item,bookedSeats=[]}) {
  
  const dispatch=useDispatch()
  const selectedSeats=useSelector(state => state.booking.seats);

  const isSelected =selectedSeats.some(seat =>seat.seatNumber === item.seatNumber)
  const isBooked = bookedSeats?.includes(item.seatNumber.toString());
  const handleClick=()=>{
    if(!isBooked){
      dispatch(selectseat(item))
    }
  }
    const seatColor = isBooked ? "bg-gray-200 text-gray-400 cursor-not-allowed " : isSelected ? "bg-info text-white" : "text-info";
  return (
    <div>
    <input
      type="checkbox"
      id={item.seatNumber}
      className="hidden peer"
      onClick={handleClick}
      checked={isSelected}
      readOnly
      disabled={isBooked}/>
    <label
      htmlFor={item.seatNumber}
      className={`btn btn-sm  border-info h-10 w-10 ${seatColor}`}
      // optional, if you have a disabled property
    >
      <p>{item.seatNumber}</p>
    </label>
  </div>
  )
}

export default Seatselector
