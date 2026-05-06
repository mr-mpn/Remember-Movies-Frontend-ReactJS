import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-500 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
        <p className="text-yellow-400 font-extrabold text-sm">🎬 Cinema List</p>
        <p className="text-xs">
          © {new Date().getFullYear()} Cinema List. Built with 🎬 and coffee.
        </p>
      </div>
    </footer>
  )
}

export default Footer
