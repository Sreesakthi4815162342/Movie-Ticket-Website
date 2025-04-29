import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      document.getElementById('my_modal_3').close()
      navigate(`search?query=${encodeURIComponent(searchQuery.trim())}`)
    }
  }
  return (
    <div>
      <button className="btn btn-ghost btn-circle" onClick={()=>document.getElementById('my_modal_3').showModal()} ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg></button>
<dialog id="my_modal_3" className="modal modal-top">
  <div className="modal-box flex justify-center">
  <form onSubmit={handleSubmit} className="w-full flex justify-center">
  <label className="input w-[75%]">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
  <input type="search" required placeholder="Search for a movie..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="grow bg-transparent outline-none"/>
</label>
</form>
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
    </div>
  )
}

export default Search
