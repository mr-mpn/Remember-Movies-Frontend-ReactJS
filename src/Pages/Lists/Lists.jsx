import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MovieModal from '../../Components/MovieModal/MovieModal'
import { addRecentMovie, getRecentMovies } from '../../utils/recentMovies'

const API = import.meta.env.VITE_API_BASE_URL

/**
 * Thumbnail component — shows up to 4 movie posters in a grid
 */
const ListThumbnail = ({ movies }) => {
  const posters = movies
    .filter((m) => m.poster && m.poster !== 'N/A')
    .slice(0, 4)

  const count = posters.length

  if (count === 0) {
    return (
      <div className="w-full h-64 bg-gray-800 rounded-xl flex items-center justify-center text-4xl">
        🎬
      </div>
    )
  }

  const gridClass =
    count === 1 ? 'grid-cols-1 grid-rows-1' :
    count === 2 ? 'grid-cols-2 grid-rows-1' :
    count === 3 ? 'grid-cols-2 grid-rows-2' :
    'grid-cols-2 grid-rows-2'

  return (
    <div className={`w-full h-64 grid ${gridClass} rounded-xl overflow-hidden`}>
      {posters.map((m, i) => (
        <img
          key={i}
          src={m.poster}
          alt={m.title}
          className={`w-full h-full object-cover ${count === 3 && i === 0 ? 'row-span-2' : ''}`}
        />
      ))}
    </div>
  )
}

/**
 * Days ago helper
 */
const daysAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return 'Today'
  if (diff === 1) return '1 day ago'
  return `${diff} days ago`
}

const Lists = () => {
  const isLoggedIn = !!localStorage.getItem('cl_token')
  const token = localStorage.getItem('cl_token')
  const navigate = useNavigate()

  // Search state
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [movie, setMovie] = useState(null)
  const [recent, setRecent] = useState(getRecentMovies)

  // Lists state
  const [lists, setLists] = useState([])
  const [listsLoading, setListsLoading] = useState(true)

  // Fetch user's lists
  const fetchLists = () => {
    if (!isLoggedIn) return
    axios
      .get(`${API}/lists`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) setLists(res.data.data.lists)
      })
      .catch((err) => console.error('Failed to load lists:', err))
      .finally(() => setListsLoading(false))
  }

  useEffect(() => {
    fetchLists()
  }, [isLoggedIn, token])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setMovie(null)

    axios
      .get(`${API}/query-movies?title=${encodeURIComponent(query)}`)
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
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full max-w-xl gap-3 mb-8">
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
      {movie && <MovieModal movie={movie} onClose={() => { setMovie(null); setQuery(''); fetchLists(); }} />}

      {/* User's lists */}
      <div className="w-full mt-8">
        <h3 className="text-lg font-bold mb-4 text-gray-300">Your Lists</h3>

        {listsLoading ? (
          <div className="flex gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-full h-48 rounded-xl bg-gray-800 animate-pulse" />
            ))}
          </div>
        ) : lists.length === 0 ? (
          <p className="text-gray-500 text-sm">No lists yet. Search for a movie and create your first list.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lists.map((list) => (
              <div
                key={list._id}
                onClick={() => navigate(`/lists/${list._id}`)}
                className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden cursor-pointer hover:border-yellow-400 transition"
              >
                <ListThumbnail movies={list.movies || []} />
                <div className="px-4 py-3">
                  <h4 className="text-white font-bold text-sm line-clamp-1">{list.name}</h4>
                  <p className="text-gray-400 text-xs line-clamp-1 mt-1">{list.description}</p>
                  <p className="text-gray-500 text-xs mt-2">{daysAgo(list.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently searched */}
      {recent.length > 0 && (
        <div className="w-full mt-12">
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
