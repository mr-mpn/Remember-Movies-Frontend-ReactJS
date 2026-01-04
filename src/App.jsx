import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  
  const [value , setValue] = useState('')
  const [imdbRating , setImdbRating] = useState(0)
  const inputHandler=(e)=>{
    setValue(e.target.value)
  }

  const searchButtonHandler = (e)=>{
    e.preventDefault() // Prevent form submission
    //alert(`The value that has been searched is ${value}`)
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
    <>
    <div>
      <h1>search for movies</h1>
      <form>
        <input type='text' onChange={inputHandler} placeholder='write the name of the movie' />
        <button type='submit' onClick={searchButtonHandler}>Search</button>
      </form> 
      <p>the name of the movie you searched is {value}</p>
      <p>IMDB Rating {imdbRating}</p>
    </div>
    </>
  )
}

export default App
