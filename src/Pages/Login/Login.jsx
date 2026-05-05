import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const handleSuccess = async (credentialResponse) => {
    try {
      setError(null)

      // Send the Google token to our backend
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        { token: credentialResponse.credential }
      )

      if (res.data?.success) {
        // Store JWT and user info
        localStorage.setItem('cl_token', res.data.data.token)
        localStorage.setItem('cl_user', JSON.stringify(res.data.data.user))

        // Remove the search gate since user is now logged in
        localStorage.removeItem('cl_searched')

        // Redirect to home
        window.dispatchEvent(new Event('cl_auth_change'))
        navigate('/')
      } else {
        setError('Authentication failed. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Authentication failed. Please try again.')
    }
  }

  const handleError = () => {
    setError('Google sign-in was cancelled or failed.')
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20 text-center flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-3">
        Welcome to <span className="text-yellow-400">CineList</span>
      </h1>
      <p className="text-gray-400 mb-10">
        Sign in with your Google account to unlock unlimited searches, build lists, and share them.
      </p>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full flex flex-col items-center gap-6">
        <span className="text-5xl">🎬</span>

        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          theme="filled_black"
          size="large"
          shape="pill"
          text="signin_with"
        />

        {error && (
          <p className="text-red-400 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  )
}

export default Login
