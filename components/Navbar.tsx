import React from 'react'

export const Navbar = () => {
  return (
     <nav className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-slate-300">
        <a href="#" className="mr-auto text-lg font-bold text-white">
          Dash
        <span className="text-blue-500">Students</span>
        </a>
        <a href="#student" className="hover:text-white">
          Students
        </a>
        <a href="#about" className="hover:text-white">
          About
        </a>
      </nav>
  )
}

