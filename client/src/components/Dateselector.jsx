import React from 'react';

function Dateselector({ Dates, selectedDate, onDateChange }) {
  const uniqueDates = [...new Set(Dates)].sort(
    (a, b) => new Date(a) - new Date(b)
  );

  return (
    <div className='flex gap-3 overflow-x-auto py-2'>
      {uniqueDates.map((startDate) => (
        <div
          key={startDate}
          onClick={() => onDateChange(startDate)}
          className={`cursor-pointer px-4 py-2 rounded-lg border 
            ${selectedDate === startDate
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black border-gray-300'
            } hover:bg-blue-100 transition`}
        >
          {new Date(startDate).toDateString()} {/* Format the date to a readable format */}
        </div>
      ))}
    </div>
  );
}

export default Dateselector;
