import React from 'react'

function Carousel({item}) {
  return (
      <div id="slide1" className="carousel-item w-full ">
        <img src={item?.image}  className="w-full h-[150px] sm:h-[300px] md:h-[450px]  lg:h-[600px] object-contain rounded-xl " alt="Slide 1" />
      </div>
  )
}

export default Carousel
