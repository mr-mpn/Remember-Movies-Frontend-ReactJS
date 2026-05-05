import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MovieModal from '../../Components/MovieModal/MovieModal'
import { addRecentMovie, getRecentMovies } from '../../utils/recentMovies'

const Lists = () => {
  const isLoggedIn = !!localStorage.getItem('cl_token')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [movie, setMovie] = useState(null)
  const [recent, setRecent] = useState(getRecentMovies)

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
          addRecentMovie(res.data.data.movie)
          setRecent(getRecentMovies())
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
        <div className="w-full bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-6 py-4 text-center mb-6">
          {error}
        </div>
      )}

      {/* Movie modal */}
      {movie && <MovieModal movie={movie} onClose={() => setMovie(null)} />}

      {/* Recently searched */}
      {recent.length > 0 && (
        <div className="w-full mt-6">
          <h3 className="text-lg font-bold mb-4 text-gray-300">Recently Searched</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {recent.map((m) => (
              <div
                key={m.imdbID}
                onClick={() => setMovie(m)}
                className="flex flex-col rounded-xl overflow-hidden border border-gray-800 bg-gray-900 cursor-pointer hover:border-yellow-400 transition"
              >
                {m.poster && m.poster !== 'N/A' ? (
                  <img src={m.poster} alt={m.title} className="w-full h-40 object-cover" />
                ) : (
                  <div className="w-full h-40 bg-gray-800 flex items-center justify-center text-3xl">🎬</div>
                )}
                <div className="px-2 py-2">
                  <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{m.title}</p>
                  <p className="text-yellow-400 text-xs mt-1">⭐ {m.imdbRating || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Lists
