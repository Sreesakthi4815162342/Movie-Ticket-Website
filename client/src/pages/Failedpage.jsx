import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { MdOutlineErrorOutline } from "react-icons/md";

function Failedpage() {
    const navigate = useNavigate()
    useEffect(() => {
        toast.error('Payment failed or was cancelled.');
        localStorage.removeItem('bookingData');
      }, []);
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
      <MdOutlineErrorOutline className='h-20 w-20 text-red-500'/>
        <h1 className="text-3xl font-bold my-4 ">Booking Failed</h1>
        <p className="text-lg mb-6">Something went wrong. Please try again </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Back to Home
        </button>
      </div>
    </div>
    </div>
  )
}

export default Failedpage
