import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4">
      <div className="relative flex items-center">
        
        {/* Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <span className="text-lg font-semibold cursor-pointer">
            Home
          </span>
        </div>

        {/* Right */}
        <div className="ml-auto">
          <button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
            Login
          </button>
        </div>

      </div>
    </nav>
  )
}

export default Navbar