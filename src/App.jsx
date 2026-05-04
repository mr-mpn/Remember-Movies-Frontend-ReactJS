import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Login/Login'
import Lists from './Pages/Lists/Lists'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lists" element={<Lists />} />
      </Routes>
    </div>
  )
}

export default App
