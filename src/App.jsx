import { useState } from 'react'
import './App.css'
import Axios from 'axios'

function App() {
  
  const [value , setValue] = useState('')

  const inputHandler=(e)=>{
    setValue(e.target.value)
  }

  const searchButtonHandler = (e)=>{
    e.preventDefault() // Prevent form submission
    alert(`The value that has been searched is ${value}`)
  }
  return (
    <>
    <div>
      <h1>search for movies</h1>
      <form>
        <input type='text' onChange={inputHandler} placeholder='write the name of the movie' />
        <button type='submit' onClick={searchButtonHandler}>Search</button>
      </form> 
      <p>the value is {value}</p>
    </div>
    </>
  )
}

export default App
