import React from 'react'

const Login = () => {
  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <form className="w-full flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-900 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login
