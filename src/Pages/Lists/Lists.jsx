import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MovieModal from '../../Components/MovieModal/MovieModal'

const Lists = () => {
  const isLoggedIn = !!localStorage.getItem('cl_token')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [movie, setMovie] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setMovie(null)

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/query-movies?title=${encodeURIComponent(query)}`)
      .then((res) => {
        if (res.data?.success) {
          setMovie(res.data.data.movie)
        } else {
          setError(res.data?.error?.message || 'Movie not found.')
        }
      })
      .catch(() => setError('Could not reach the server.'))
      .finally(() => setLoading(false))
  }

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          My <span className="text-yellow-400">Lists</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Sign in to access your movie lists and unlimited search.
        </p>
        <Link
          to="/login"
          className="bg-yellow-400 text-gray-950 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          Sign In
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-3 text-center">
        My <span className="text-yellow-400">Lists</span>
      </h1>
      <p className="text-gray-400 mb-10 text-center">
        Search for any movie and add it to your lists.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Inception, The Godfather..."
          className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-yellow-400 text-gray-950 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
        >
          {loading ? '...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-6 py-4 text-center">
          {error}
        </div>
      )}

      {/* Movie modal */}
      {movie && <MovieModal movie={movie} onClose={() => setMovie(null)} />}

      {/* Placeholder for future lists */}
      <div className="w-full mt-12 border-t border-gray-800 pt-10 text-center">
        <p className="text-gray-500 text-sm">
          Your saved lists will appear here soon.
        </p>
      </div>
    </div>
  )
}

export default Lists
