import React, { useEffect, useState, memo } from 'react'
import axios from 'axios'
import MovieModal from '../MovieModal/MovieModal'

const TestimonialMarquee = memo(() => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/trending`)
      .then((res) => {
        if (res.data?.success) {
          const fetched = res.data.data.movies.filter((m) => m.poster && m.poster !== 'N/A')
          setMovies(fetched)
          setStatus(fetched.length > 0 ? 'done' : 'empty')
        } else {
          setStatus('empty')
        }
      })
      .catch(() => setStatus('empty'))
  }, [])

  const items = [...movies, ...movies]

  return (
    <>
      <section className="w-full py-16 bg-gray-950 overflow-hidden">
        <p className="text-center text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-10">
          Trending on Cinema List
        </p>

        {status === 'loading' && (
          <div className="flex gap-6 px-6 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-44 h-80 rounded-2xl bg-gray-800 animate-pulse" />
            ))}
          </div>
        )}

        {status === 'empty' && (
          <p className="text-center text-gray-500 text-sm">Could not load trending movies.</p>
        )}

        {status === 'done' && (
          <div className="relative flex">
            <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-marquee">
              {items.map((movie, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedMovie(movie)}
                  className="flex-shrink-0 w-44 flex flex-col rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 cursor-pointer hover:border-yellow-400 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="px-3 py-3 flex flex-col gap-1">
                    <p className="text-white text-sm font-semibold leading-tight line-clamp-2">
                      {movie.title}
                    </p>
                    <p className="text-yellow-400 text-xs font-bold">
                      ⭐ {movie.imdbRating || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </>
  )
})

export default TestimonialMarquee
