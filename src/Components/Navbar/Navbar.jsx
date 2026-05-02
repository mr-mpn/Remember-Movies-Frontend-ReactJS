import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-400 font-semibold transition'
      : 'text-gray-300 hover:text-white font-semibold transition'

  return (
    <nav className="bg-gray-950 border-b border-gray-800 text-white px-8 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-yellow-400 text-xl font-extrabold tracking-wide">
          🎬 CineList
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            Search
          </NavLink>
          <Link
            to="/login"
            className="bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-full hover:bg-yellow-300 transition text-sm"
          >
            Login
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
