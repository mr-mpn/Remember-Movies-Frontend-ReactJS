import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Homepage from './Pages/Homepage/Homepage'
import Login from './Pages/Login/Login'
import Lists from './Pages/Lists/Lists'
import ListDetail from './Pages/ListDetail/ListDetail'
import NotFound from './Pages/NotFound/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/:id" element={<ListDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
