import React from 'react'

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

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal panel — stop click propagation so clicking inside doesn't close */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none z-10"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Poster */}
        {movie.poster && movie.poster !== 'N/A' ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full md:w-52 object-cover flex-shrink-0 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
          />
        ) : (
          <div className="w-full md:w-52 bg-gray-800 flex items-center justify-center text-6xl flex-shrink-0 py-12 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
            🎬
          </div>
        )}

        {/* Details */}
        <div className="flex flex-col gap-5 p-6 flex-1 overflow-y-auto">

          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-1 pr-8">
                <h2 className="text-2xl font-extrabold">{movie.title}</h2>
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
            <p className="text-gray-400 text-sm">
              {movie.year} &bull; {movie.rated} &bull; {movie.runtime}
            </p>
            <p className="text-yellow-400 text-sm mt-1">{movie.genre}</p>
          </div>

          {/* Ratings */}
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
            <InfoRow icon="🎥" label="Director"  value={movie.director} />
            <InfoRow icon="✍️" label="Writer"    value={movie.writer} />
            <InfoRow icon="🎭" label="Actors"    value={movie.actors} />
            <InfoRow icon="🌍" label="Country"   value={movie.country} />
            <InfoRow icon="🗣️" label="Language"  value={movie.language} />
            <InfoRow icon="📅" label="Released"  value={movie.released} />
            <InfoRow icon="🏆" label="Awards"    value={movie.awards} />
          </div>

        </div>
      </div>
    </div>
  )
}

export default MovieModal
