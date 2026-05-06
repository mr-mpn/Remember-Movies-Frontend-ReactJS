import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MovieModal from '../../Components/MovieModal/MovieModal'

const API = import.meta.env.VITE_API_BASE_URL

const ListDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('cl_token')
  const isLoggedIn = !!token

  const [list, setList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [movie, setMovie] = useState(null)
  const [showDelete, setShowDelete] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [copied, setCopied] = useState(false)

  const fetchList = () => {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    axios
      .get(`${API}/lists/${id}`, { headers })
      .then((res) => {
        if (res.data?.success) {
          setList(res.data.data.list)
          setEditName(res.data.data.list.name)
          setEditDesc(res.data.data.list.description)
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

  const handleDelete = () => {
    axios
      .delete(`${API}/lists/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) navigate('/lists')
      })
      .catch((err) => console.error('Failed to delete list:', err))
  }

  const handleEdit = (e) => {
    e.preventDefault()
    axios
      .put(`${API}/lists/${id}`, { name: editName, description: editDesc }, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) {
          setEditing(false)
          fetchList()
        }
      })
      .catch((err) => console.error('Failed to update list:', err))
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isOwner = isLoggedIn && list && list.userId?.toString() === JSON.parse(localStorage.getItem('cl_user') || '{}')?.id

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col items-center gap-4">
        <div className="w-full h-8 rounded bg-gray-800 animate-pulse" />
        <div className="w-2/3 h-6 rounded bg-gray-800 animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-44 h-80 rounded-2xl bg-gray-800 animate-pulse" />
          ))}
        </div>
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
        className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 text-sm font-semibold mb-6 self-start bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg hover:border-yellow-400 transition"
      >
        ← Back to lists
      </button>

      {/* Header */}
      {editing ? (
        <form onSubmit={handleEdit} className="flex flex-col sm:flex-row gap-3 mb-8 items-start">
          <div className="flex-1 flex flex-col gap-2">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 text-xl font-extrabold focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="bg-gray-900 border border-gray-700 text-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex gap-2 self-start">
            <button type="submit" className="bg-yellow-400 text-gray-950 font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition text-sm">
              Save
            </button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          {/* Left: info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-extrabold truncate">{list.name}</h1>
            <p className="text-gray-400 text-sm mt-1 truncate">{list.description}</p>
            <p className="text-gray-500 text-xs mt-1">
              {list.movies?.length || 0} movie{list.movies?.length !== 1 ? 's' : ''} · {list.isPublic ? 'Public' : 'Private'}
            </p>
          </div>

          {/* Right: actions */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            {list.isPublic && (
              <button
                onClick={handleShare}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-sm transition"
              >
                {copied ? '✓ Copied!' : '🔗 Share'}
              </button>
            )}
            {isOwner && (
              <>
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg text-sm transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => setShowDelete(true)}
                  className="bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-800 px-3 py-1.5 rounded-lg text-sm transition"
                >
                  🗑️ Delete List
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Movies grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {list.movies?.map((m) => (
          <div
            key={m._id}
            onClick={() => setMovie(m)}
            className="w-44 flex flex-col rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 cursor-pointer hover:border-yellow-400 hover:scale-105 transition-transform duration-200"
          >
            {m.poster && m.poster !== 'N/A' ? (
              <img src={m.poster} alt={`${m.title} poster`} className="w-full h-64 object-cover" />
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

      {/* Movie modal with remove */}
      {movie && (
        <MovieModal
          movie={movie}
          onClose={() => { setMovie(null); fetchList(); }}
          onRemove={isOwner ? () => {
            const movieId = movie._id
            axios
              .delete(`${API}/lists/${id}/movies/${movieId}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => {
                if (res.data?.success) {
                  if (res.data.data.deleted) {
                    navigate('/lists')
                  } else {
                    setMovie(null)
                    fetchList()
                  }
                }
              })
              .catch((err) => console.error('Failed to remove movie:', err))
          } : undefined}
        />
      )}

      {/* Delete confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-xs text-center flex flex-col gap-4">
            <p className="text-white font-bold">Delete this list?</p>
            <p className="text-gray-400 text-sm">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDelete(false)}
                className="flex-1 bg-gray-800 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListDetail
