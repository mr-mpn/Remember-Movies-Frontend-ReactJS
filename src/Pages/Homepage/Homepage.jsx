import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TestimonialMarquee from '../../Components/Marquee/TestimonialMarquee'
import MovieModal from '../../Components/MovieModal/MovieModal'
import { addRecentMovie } from '../../utils/recentMovies'

const features = [
  {
    icon: '🎬',
    title: 'Track What You Watch',
    desc: 'Keep a personal log of every movie you have seen. Never forget a title again.',
  },
  {
    icon: '📋',
    title: 'Build Your Lists',
    desc: 'Organise movies into custom lists — favourites, watchlist, hidden gems, whatever you like.',
  },
  {
    icon: '🔗',
    title: 'Share With Others',
    desc: 'Share your lists with friends or the world with a single link.',
  },
]

const Homepage = () => {
  const [query, setQuery]     = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const [movie, setMovie]     = useState(null)
  const isLoggedIn = !!localStorage.getItem('cl_token')
  const [gated, setGated]     = useState(() => {
    if (isLoggedIn) return false
    return !!localStorage.getItem('cl_searched')
  })

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
          if (!isLoggedIn) {
            localStorage.setItem('cl_searched', 'true')
            setGated(true)
          }
        } else {
          setError(res.data?.error?.message || 'Movie not found.')
        }
      })
      .catch(() => setError('Could not reach the server.'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col items-center">

      {/* Hero with search bar */}
      <section className="w-full flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-4">
          🎥 Your personal movie universe
        </p>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight max-w-3xl mb-6">
          Discover. Track.{' '}
          <span className="text-yellow-400">Share.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Create lists of movies you have watched or loved, search for any title,
          and share your taste with the world.
        </p>

        {/* Search bar in hero */}
        {gated ? (
          <div className="w-full max-w-xl bg-gray-900/80 border border-yellow-400/40 rounded-2xl px-6 py-8 flex flex-col items-center gap-3">
            <span className="text-4xl">🔒</span>
            <p className="text-white font-bold">You've used your free search</p>
            <p className="text-gray-400 text-sm">Sign in to unlock unlimited searches.</p>
            <Link
              to="/login"
              className="bg-yellow-400 text-gray-950 font-bold px-6 py-2.5 rounded-full hover:bg-yellow-300 transition mt-1"
            >
              Sign In with Google
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row w-full max-w-xl gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any movie..."
              className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-500"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-gray-950 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 transition"
            >
              {loading ? '...' : 'Search'}
            </button>
          </form>
        )}

        {!isLoggedIn && !gated && (
          <p className="text-gray-400 text-xs mt-3">
            1 free search available · <Link to="/login" className="text-yellow-400 hover:underline">Sign in</Link> for unlimited
          </p>
        )}

        {error && (
          <div className="mt-4 bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-6 py-3 text-sm">
            {error}
          </div>
        )}
      </section>

      {/* Movie modal */}
      {movie && <MovieModal movie={movie} onClose={() => setMovie(null)} />}

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* Features */}
      <section className="w-full max-w-5xl px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-gray-900 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-800 hover:border-yellow-400 transition"
          >
            <span className="text-5xl mb-4">{f.icon}</span>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Trending marquee */}
      <div className="w-full h-px bg-gray-800" />
      <TestimonialMarquee />

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* CTA banner — different for logged in vs not */}
      {isLoggedIn ? (
        <section className="w-full bg-gray-900 py-16 flex flex-col items-center text-center px-6">
          <h2 className="text-3xl font-extrabold mb-4 text-white">Your lists are waiting</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Organise your favourites, build watchlists, and share them.
          </p>
          <Link
            to="/lists"
            className="bg-yellow-400 text-gray-950 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition text-lg"
          >
            Go to My Lists
          </Link>
        </section>
      ) : (
        <section className="w-full bg-yellow-400 text-gray-950 py-16 flex flex-col items-center text-center px-6">
          <h2 className="text-4xl font-extrabold mb-4">Ready to start your list?</h2>
          <p className="text-gray-800 mb-8 text-lg">
            Sign up for free and start tracking movies today.
          </p>
          <Link
            to="/login"
            className="bg-gray-950 text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition text-lg"
          >
            Create an Account
          </Link>
        </section>
      )}

    </div>
  )
}

export default Homepage
