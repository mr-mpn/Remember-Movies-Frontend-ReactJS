import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TestimonialMarquee from '../../Components/Marquee/TestimonialMarquee'
import MovieModal from '../../Components/MovieModal/MovieModal'

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
  const [gated, setGated]     = useState(() => !!localStorage.getItem('cl_searched'))

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
          // Mark that the free search has been used
          localStorage.setItem('cl_searched', 'true')
          setGated(true)
        } else {
          setError(res.data?.error?.message || 'Movie not found.')
        }
      })
      .catch(() => setError('Could not reach the server. Is the backend running?'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex flex-col items-center">

      {/* Hero */}
      <section className="w-full flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-4">
          🎥 Your personal movie universe
        </p>
        <h1 className="text-6xl font-extrabold leading-tight max-w-3xl mb-6">
          Discover. Track.{' '}
          <span className="text-yellow-400">Share.</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-xl mb-10">
          Create lists of movies you have watched or loved, search for any title,
          and share your taste with the world.
        </p>
        <div className="flex gap-4">
          <a
            href="#search"
            className="bg-yellow-400 text-gray-950 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition text-lg"
          >
            Search Movies
          </a>
          <Link
            to="/login"
            className="border border-gray-600 text-white px-8 py-3 rounded-full hover:border-gray-400 transition text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

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

      {/* Search section */}
      <div className="w-full h-px bg-gray-800" />
      <section id="search" className="w-full max-w-3xl px-6 py-20 flex flex-col items-center text-center">
        <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-3">
          Find any movie
        </p>
        <h2 className="text-4xl font-extrabold mb-3">
          Search <span className="text-yellow-400">Movies</span>
        </h2>
        <p className="text-gray-400 mb-10">
          Get full details — ratings, cast, plot, awards and more.
        </p>

        {gated ? (
          /* Gate — shown after the free search is used */
          <div className="w-full max-w-xl bg-gray-900 border border-yellow-400/40 rounded-2xl px-8 py-10 flex flex-col items-center gap-4">
            <span className="text-5xl">🔒</span>
            <h3 className="text-2xl font-extrabold">You've used your free search</h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Sign in or create a free account to unlock unlimited searches, build lists, and share them with others.
            </p>
            <div className="flex gap-3 mt-2">
              <Link
                to="/login"
                className="bg-yellow-400 text-gray-950 font-bold px-6 py-2.5 rounded-full hover:bg-yellow-300 transition"
              >
                Sign In
              </Link>
              <Link
                to="/login"
                className="border border-gray-600 text-white px-6 py-2.5 rounded-full hover:border-gray-400 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          /* Search form */
          <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-3">
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
        )}

        {error && (
          <div className="mt-6 bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-6 py-4">
            {error}
          </div>
        )}
      </section>

      {/* Movie modal */}
      {movie && <MovieModal movie={movie} onClose={() => setMovie(null)} />}

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* CTA banner */}
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

    </div>
  )
}

export default Homepage
