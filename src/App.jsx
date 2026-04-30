import { useState } from 'react'
import axios from 'axios'

function App() {
  
  const [value , setValue] = useState('')
  const [imdbRating , setImdbRating] = useState(0)
  const inputHandler=(e)=>{
    setValue(e.target.value)
  }

  const searchButtonHandler = (e)=>{
    e.preventDefault() // Prevent form submission
    axios.get(`http://localhost:3000/dev/query-movies?title=${value}`)
  .then(response => {
    console.log(response.data); 
    setImdbRating(response.data?.data?.movie?.imdbRating)
  })
  .catch(error => {
    console.error('Error making the request:', error);
  });
  }
  return (
    <div className="max-w-5xl mx-auto p-8 text-center min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-8">Search for Movies</h1>
      <form className="flex gap-3 mb-6">
        <input
          type="text"
          onChange={inputHandler}
          placeholder="Write the name of the movie"
          className="rounded-lg border border-gray-300 px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          onClick={searchButtonHandler}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white font-medium hover:bg-indigo-700 cursor-pointer transition-colors"
        >
          Search
        </button>
      </form>
      <p className="text-lg text-gray-600">The name of the movie you searched is <span className="font-semibold text-gray-900">{value}</span></p>
      <p className="text-lg text-gray-600">IMDB Rating <span className="font-semibold text-yellow-500">{imdbRating}</span></p>
    </div>
  )
}

export default App
