import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center flex flex-col items-center">
      <span className="text-7xl mb-6">🎬</span>
      <h1 className="text-5xl font-extrabold mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-8">
        This page doesn't exist. Maybe the movie you're looking for is on the homepage.
      </p>
      <Link
        to="/"
        className="bg-yellow-400 text-gray-950 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
      >
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
