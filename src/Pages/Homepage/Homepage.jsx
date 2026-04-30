import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const Homepage = () => {
    const [value, setValue] = useState('')
  const [imdbRating, setImdbRating] = useState(null)

  const inputHandler = (e) => {
    setValue(e.target.value)
  }

  const searchButtonHandler = (e) => {
    e.preventDefault()

    axios.get(`http://localhost:3000/dev/query-movies?title=${value}`)
      .then(response => {
        setImdbRating(response.data?.data?.movie?.imdbRating)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 text-center flex flex-col items-center">
        
        <h1 className="text-5xl font-bold mb-10">
          Search for Movies
        </h1>

        <form className="flex gap-3 mb-8">
          <input
            type="text"
            onChange={inputHandler}
            placeholder="Write the name of the movie"
            className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            onClick={searchButtonHandler}
            className="bg-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </form>

        <p className="text-gray-400">
          Movie: <span className="text-white font-semibold">{value}</span>
        </p>

        <p className="text-gray-400 mt-2">
          IMDB Rating:{" "}
          <span className="text-yellow-400 font-semibold">
            {imdbRating ?? '-'}
          </span>
        </p>

      </div>
  )
}

export default Homepage
