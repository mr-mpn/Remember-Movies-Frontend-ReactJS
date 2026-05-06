import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MovieModal from '../../Components/MovieModal/MovieModal'

const API = import.meta.env.VITE_API_BASE_URL

const ListDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('cl_token')

  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movie, setMovie] = useState(null)

  const fetchList = () => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    axios
      .get(`${API}/lists/${id}`, { headers })
      .then((res) => {
        if (res.data?.success) {
          setList(res.data.data.list)
        } else {
          setError('List not found.')
        }
      })
      .catch((err) => {
        const msg = err.response?.data?.error?.message || 'Failed to load list.'
        setError(msg)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchList()
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center">
        <div className="w-full h-64 rounded-xl bg-gray-800 animate-pulse" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        <p className="text-red-400 text-lg">{error}</p>
        <button
          onClick={() => navigate('/lists')}
          className="mt-6 text-gray-400 hover:text-white text-sm"
        >
          ← Back to lists
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col">
      <button
        onClick={() => navigate('/lists')}
        className="text-gray-400 hover:text-white text-sm mb-6 self-start"
      >
        ← Back to lists
      </button>

      <h1 className="text-4xl font-extrabold mb-2">{list.name}</h1>
      <p className="text-gray-400 mb-2">{list.description}</p>
      <p className="text-gray-600 text-sm mb-8">
        {list.movies?.length || 0} movie{list.movies?.length !== 1 ? 's' : ''} · {list.isPublic ? 'Public' : 'Private'}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {list.movies?.map((m) => (
          <div
            key={m._id}
            onClick={() => setMovie(m)}
            className="w-44 flex flex-col rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 cursor-pointer hover:border-yellow-400 hover:scale-105 transition-transform duration-200"
          >
            {m.poster && m.poster !== 'N/A' ? (
              <img src={m.poster} alt={m.title} className="w-full h-64 object-cover" />
            ) : (
              <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-4xl">🎬</div>
            )}
            <div className="px-3 py-3 flex flex-col gap-1">
              <p className="text-white text-sm font-semibold leading-tight line-clamp-2">{m.title}</p>
              <p className="text-yellow-400 text-xs font-bold">⭐ {m.imdbRating || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>

      {movie && (
        <MovieModal
          movie={movie}
          onClose={() => { setMovie(null); fetchList(); }}
          onRemove={() => {
            const movieId = movie._id
            axios
              .delete(`${API}/lists/${id}/movies/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => {
                if (res.data?.success) {
                  if (res.data.data.deleted) {
                    // List was deleted (last movie removed)
                    navigate('/lists')
                  } else {
                    setMovie(null)
                    fetchList()
                  }
                }
              })
              .catch((err) => console.error('Failed to remove movie:', err))
          }}
        />
      )}
    </div>
  )
}

export default ListDetail
