'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-700 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-2 flex items-center justify-between flex-wrap" style={{ backgroundColor: "#f9fafb" }}>
      <div className="flex items-center space-x-2">
        <img src="/Whimsical Vintage Culinary Creations Logo.png" alt="Recipe Generator Logo" className="h-8 w-8 mr-2" />
        <span className="text-2xl font-bold text-cyan-600 font-sans">Culinary Creations</span>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded transition">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded transition">About</Link>
          <Link href="/generate" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded transition">Generate Recipe</Link>
          <Link href="/feedback" className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded transition">Feedback</Link>
        </div>
      </div>
      <div className="flex items-center mt-2 md:mt-0 space-x-2">
        <form className="flex">
          <input type="text" placeholder="Search recipes..." className="border border-gray-300 rounded-l px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-200" />
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded-r hover:bg-green-700 transition">
            Search
          </button>
        </form>
      </div>
    </nav>
  )
}