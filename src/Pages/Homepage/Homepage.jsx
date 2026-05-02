import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🎬',
    title: 'Track What You Watch',
    desc: 'Keep a personal log of every movie you have seen. Never forget a title again.',
  },
  {
    icon: '📋',
    title: 'Build Your Lists',
    desc: 'Organise movies into custom lists — favourites, watchlist, hidden gems, whatever you like.',
  },
  {
    icon: '🔗',
    title: 'Share With Others',
    desc: 'Share your lists with friends or the world with a single link.',
  },
]

const Homepage = () => {
  return (
    <div className="flex flex-col items-center">

      {/* Hero */}
      <section className="w-full flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <p className="text-yellow-400 uppercase tracking-widest text-sm font-semibold mb-4">
          🎥 Your personal movie universe
        </p>
        <h1 className="text-6xl font-extrabold leading-tight max-w-3xl mb-6">
          Discover. Track.{' '}
          <span className="text-yellow-400">Share.</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-xl mb-10">
          Create lists of movies you have watched or loved, search for any title,
          and share your taste with the world.
        </p>
        <div className="flex gap-4">
          <Link
            to="/search"
            className="bg-yellow-400 text-gray-950 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition text-lg"
          >
            Search Movies
          </Link>
          <Link
            to="/login"
            className="border border-gray-600 text-white px-8 py-3 rounded-full hover:border-gray-400 transition text-lg"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gray-800" />

      {/* Features */}
      <section className="w-full max-w-5xl px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-gray-900 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-800 hover:border-yellow-400 transition"
          >
            <span className="text-5xl mb-4">{f.icon}</span>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA banner */}
      <section className="w-full bg-yellow-400 text-gray-950 py-16 flex flex-col items-center text-center px-6">
        <h2 className="text-4xl font-extrabold mb-4">Ready to start your list?</h2>
        <p className="text-gray-800 mb-8 text-lg">
          Sign up for free and start tracking movies today.
        </p>
        <Link
          to="/login"
          className="bg-gray-950 text-white font-bold px-8 py-3 rounded-full hover:bg-gray-800 transition text-lg"
        >
          Create an Account
        </Link>
      </section>

    </div>
  )
}

export default Homepage
