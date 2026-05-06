import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_BASE_URL

const AddToListPopup = ({ movieId, onClose }) => {
  const token = localStorage.getItem('cl_token')
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newName, setNewName] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [feedback, setFeedback] = useState(null)

  // Fetch user's lists
  useEffect(() => {
    axios
      .get(`${API}/lists`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.data?.success) setLists(res.data.data.lists)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [token])

  // Add movie to existing list
  const handleAddToList = async (listId) => {
    try {
      const res = await axios.post(
        `${API}/lists/${listId}/movies`,
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data?.success) {
        setFeedback('Added!')
        setTimeout(onClose, 800)
      }
    } catch (err) {
      const msg = err.response?.data?.error?.message || 'Failed to add'
      setFeedback(msg)
    }
  }

  // Create new list with this movie
  const handleCreateList = async (e) => {
    e.preventDefault()
    if (!newName.trim() || !newDesc.trim()) return

    try {
      const res = await axios.post(
        `${API}/lists`,
        { name: newName, description: newDesc, isPublic: false, movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (res.data?.success) {
        setFeedback('List created!')
        setTimeout(onClose, 800)
      }
    } catch (err) {
      const msg = err.response?.data?.error?.message || 'Failed to create list'
      setFeedback(msg)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-sm p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Add to List</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">✕</button>
        </div>

        {feedback && (
          <p className="text-yellow-400 text-sm text-center font-semibold">{feedback}</p>
        )}

        {loading ? (
          <p className="text-gray-400 text-sm animate-pulse">Loading lists...</p>
        ) : (
          <>
            {/* Existing lists */}
            {lists.length > 0 && (
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                {lists.map((list) => (
                  <button
                    key={list._id}
                    onClick={() => handleAddToList(list._id)}
                    className="text-left bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg px-4 py-2 transition"
                  >
                    <p className="text-white text-sm font-semibold">{list.name}</p>
                    <p className="text-gray-400 text-xs line-clamp-1">{list.description}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="h-px bg-gray-700" />

            {/* Create new list */}
            {creating ? (
              <form onSubmit={handleCreateList} className="flex flex-col gap-3">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="List name"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Description"
                  className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-yellow-400 text-gray-950 font-bold py-2 rounded-lg hover:bg-yellow-300 transition text-sm"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreating(false)}
                    className="flex-1 bg-gray-800 text-gray-300 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setCreating(true)}
                className="w-full bg-gray-800 hover:bg-gray-700 border border-dashed border-gray-600 rounded-lg px-4 py-3 text-sm text-gray-300 transition"
              >
                + Create new list
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default AddToListPopup
