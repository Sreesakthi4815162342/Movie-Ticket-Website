import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GiTheater } from "react-icons/gi";
import { MdOutlineLocalMovies } from "react-icons/md";
import { SiShowtime } from "react-icons/si";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const navigate=useNavigate()

  return (
    <div>
      <div
        className={`bg-gradient-to-t from-blue-800 to-sky-800 p-4 w-64 space-y-4 fixed text-white top-0 left-0 h-full z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <SiShowtime className='h-7 w-7 text-red-500'/>
        <ul className="menu rounded-box w-full gap-2 ">
          <li onClick={()=>navigate("/admin")}>
            <a><LuLayoutDashboard />Dashboard</a>
          </li>
          <li onClick={()=>navigate("admintheaters")}>
            <a><GiTheater />Theaters</a>
          </li>
          <li onClick={()=>navigate("adminmoviespage")}>
            <a><MdOutlineLocalMovies />Movies</a>
          </li>
        </ul>
      </div>

    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;