import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-400 font-semibold transition'
      : 'text-gray-300 hover:text-white font-semibold transition'

  return (
    <nav className="bg-gray-950 border-b border-gray-800 text-white px-8 py-4">
      <div className="max-w-6xl mx-auto flex items-center">

        {/* Left links */}
        <div className="flex items-center gap-8 flex-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </div>

        {/* Centered logo */}
        <Link
          to="/"
          className="text-yellow-400 text-xl font-extrabold tracking-wide whitespace-nowrap"
        >
          🎬 Cinema List
        </Link>

        {/* Right links */}
        <div className="flex items-center gap-8 flex-1 justify-end">
          <NavLink to="/lists" className={linkClass}>
            My Lists
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
