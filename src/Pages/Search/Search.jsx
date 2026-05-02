import React, { useState } from 'react'
import axios from 'axios'
import { SiImdb } from 'react-icons/si'

const RatingBadge = ({ label, value, color }) => (
  <div className={`flex flex-col items-center bg-gray-800 border ${color} rounded-xl px-4 py-3 min-w-[90px]`}>
    <span className="text-xs text-gray-400 mb-1">{label}</span>
    <span className="text-lg font-bold">{value}</span>
  </div>
)

const InfoRow = ({ icon, label, value }) => {
  if (!value || value === 'N/A') return null
  return (
    <div className="flex gap-3 items-start">
      <span className="text-xl mt-0.5">{icon}</span>
      <div>
        <span className="text-gray-400 text-sm">{label}</span>
        <p className="text-white text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

const Search = () => {
  const [query, setQuery] = useState('')
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setMovie(null)

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/query-movies?title=${query}`)
      .then((res) => {
        if (res.data?.success) {
          setMovie(res.data.data.movie)
        } else {
          setError(res.data?.error?.message || 'Movie not found.')
        }
      })
      .catch(() => setError('Could not reach the server. Is the backend running?'))
      .finally(() => setLoading(false))
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">

      {/* Title */}
      <h1 className="text-5xl font-extrabold mb-2 text-center">
        Search <span className="text-yellow-400">Movies</span>
      </h1>
      <p className="text-gray-400 mb-10 text-center">
        Find any movie and see its full details in one place.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex w-full max-w-xl gap-3 mb-12">
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
          Search
        </button>
      </form>

      {/* Loading */}
      {loading && (
        <p className="text-gray-400 animate-pulse text-lg">Searching...</p>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-xl px-6 py-4 text-center">
          {error}
        </div>
      )}

      {/* Movie card */}
      {movie && (
        <div className="w-full bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 shadow-2xl">

          {/* Poster */}
          {movie.poster && movie.poster !== 'N/A' ? (
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full md:w-56 object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-full md:w-56 bg-gray-800 flex items-center justify-center text-6xl flex-shrink-0 py-12">
              🎬
            </div>
          )}

          {/* Details */}
          <div className="flex flex-col gap-5 p-6 flex-1">

            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-extrabold">{movie.title}</h2>
                  {movie.isRecent && (
                    <span className="bg-yellow-400 text-gray-950 text-xs font-bold px-2 py-0.5 rounded-full">
                      NEW
                    </span>
                  )}
                  {movie.hasHighRating && (
                    <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      TOP RATED
                    </span>
                  )}
                </div>
                {movie.imdbID && (
                  <a
                    href={`${import.meta.env.VITE_IMDB_BASE_URL}/${movie.imdbID}`}
                    target="_blank"
                    rel="noreferrer"
                    title="View on IMDb"
                    className="text-yellow-400 hover:text-yellow-300 transition"
                  >
                    <SiImdb size={40} />
                  </a>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                {movie.year} &bull; {movie.rated} &bull; {movie.runtime}
              </p>
              <p className="text-yellow-400 text-sm mt-1">{movie.genre}</p>
            </div>

            {/* Ratings row */}
            <div className="flex flex-wrap gap-3">
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <RatingBadge label="IMDb" value={`⭐ ${movie.imdbRating}`} color="border-yellow-500" />
              )}
              {movie.metascore && movie.metascore !== 'N/A' && (
                <RatingBadge label="Metascore" value={movie.metascore} color="border-green-600" />
              )}
              {movie.rottenTomatoesScore && movie.rottenTomatoesScore !== 'N/A' && (
                <RatingBadge label="Rotten Tomatoes" value={`🍅 ${movie.rottenTomatoesScore}`} color="border-red-500" />
              )}
              {movie.boxOffice && movie.boxOffice !== 'N/A' && (
                <RatingBadge label="Box Office" value={movie.boxOffice} color="border-gray-600" />
              )}
            </div>

            {/* Plot */}
            {movie.plot && movie.plot !== 'N/A' && (
              <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-yellow-400 pl-4 italic">
                {movie.plot}
              </p>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon="🎥" label="Director" value={movie.director} />
              <InfoRow icon="✍️" label="Writer" value={movie.writer} />
              <InfoRow icon="🎭" label="Actors" value={movie.actors} />
              <InfoRow icon="🌍" label="Country" value={movie.country} />
              <InfoRow icon="🗣️" label="Language" value={movie.language} />
              <InfoRow icon="📅" label="Released" value={movie.released} />
              <InfoRow icon="🏆" label="Awards" value={movie.awards} />
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Search
