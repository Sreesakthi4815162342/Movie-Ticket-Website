import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegLaughSquint } from 'react-icons/fa';

function NotFoundpage() {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-yellow-50 px-4">
      <div className="text-center max-w-md">
        <FaRegLaughSquint className="text-yellow-500 w-24 h-24 mx-auto mb-4 animate-bounce" />
        <h1 className="text-6xl font-extrabold text-yellow-700 mb-3">404</h1>
        <p className="text-xl text-gray-700 mb-4">
        This page took a coffee break and never came back. 
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Maybe it ran off with your popcorn? 🍿
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow hover:bg-yellow-600 transition duration-200"
        >
          Back to Safe Land
        </button>
      </div>
    </div>
  )
}

export default NotFoundpage
