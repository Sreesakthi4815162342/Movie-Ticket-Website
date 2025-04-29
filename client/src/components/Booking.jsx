import React from 'react'

function Booking({item}) {
  console.log(item);
  const startDate = new Date(item?.show?.startDate);
  const formattedDate = startDate.toLocaleDateString('en-GB');
  const seatNumbers=item.seats.map((seat)=>(
    seat.seatNumber 
  ))
  return (
      <div className="card bg-base-100 image-full  flex justify-center items-center shadow-sm">
  <figure className='h-80'>
    <img
      src={item?.show?.movie?.image}
      className='h-full w-full object-cover'/>
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title text-2xl">{item?.show?.movie?.title}</h2>
    <div className='flex gap-1'>
          <h3 className="text-sm font-semibold">Seats:</h3>
          <ul className="text-sm gap-1 flex">
            {seatNumbers.length > 0 ? (
              seatNumbers.map((seat, index) => (
                <li key={index}>{seat}</li>
              ))
            ) : (
              <li>No seats selected</li>
            )}
          </ul>
        </div>
        <div className='flex gap-1'>
        <h3 className="text-sm font-semibold">Date:</h3>
        <p>{formattedDate}</p>
        </div>
        <div className='flex gap-1'>
          <h3 className='text-sm font-semibold'>Time:</h3>
          <p>{item?.show?.startTime}</p>
        </div>
        <div className='flex gap-1'>
        <h3 className='text-sm font-semibold'>Theater:</h3>
        <p>{item?.show?.theater?.name}</p>
        </div>
  </div>
</div>
  )
}

export default Booking
