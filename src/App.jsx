import React from 'react'

import Navbar from './Components/Navbar/Navbar'
import Homepage from './Pages/Homepage/Homepage'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* Navbar full width */}
      <Navbar />

      {/* Content */}
      <Homepage/>
    </div>
  )
}

export default App