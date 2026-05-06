import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cl_user')
    if (stored) setUser(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const handleStorage = () => {
      const stored = localStorage.getItem('cl_user')
      setUser(stored ? JSON.parse(stored) : null)
    }
    window.addEventListener('storage', handleStorage)
    window.addEventListener('cl_auth_change', handleStorage)
    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('cl_auth_change', handleStorage)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('cl_token')
    localStorage.removeItem('cl_user')
    window.location.href = '/'
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-yellow-400 font-semibold transition'
      : 'text-gray-300 hover:text-white font-semibold transition'

  return (
    <nav className="bg-gray-950 border-b border-gray-800 text-white px-6 md:px-8 py-4 relative">
      <div className="max-w-6xl mx-auto flex items-center">

        {/* Left links (desktop) */}
        <div className="hidden md:flex items-center gap-8 flex-1">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
        </div>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white text-2xl mr-4"
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Centered logo */}
        <Link
          to="/"
          className="text-yellow-400 text-lg md:text-xl font-extrabold tracking-wide whitespace-nowrap"
        >
          🎬 Cinema List
        </Link>

        {/* Right links (desktop) */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
          {user && (
            <NavLink to="/lists" className={linkClass}>
              My Lists
            </NavLink>
          )}

          {user ? (
            <div className="flex items-center gap-3">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-yellow-400"
                />
              )}
              <span className="text-sm font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-full hover:bg-yellow-300 transition text-sm"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile spacer */}
        <div className="md:hidden flex-1" />
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-950 border-b border-gray-800 px-6 py-4 flex flex-col gap-4 z-40">
          <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          {user && (
            <NavLink to="/lists" className={linkClass} onClick={() => setMenuOpen(false)}>
              My Lists
            </NavLink>
          )}
          {user ? (
            <div className="flex items-center gap-3 pt-2 border-t border-gray-800">
              {user.picture && (
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full border-2 border-yellow-400" />
              )}
              <span className="text-sm font-semibold">{user.name}</span>
              <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm ml-auto">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-full text-center text-sm" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
