import React from "react";
import { Search } from "lucide-react";

export default function HeaderMovie({
  search,
  setSearch,
  isOnline,
  className,
}) {
  return (
    <header
      className={`bg-cover bg-center text-white px-3 sm:px-6 lg:px-8 py-3 sm:py-4 ${className}`}
      style={{
        backgroundImage:
          "url('/bg1.jpeg') || 'linear-gradient(to bottom, #1f2937, #111827)'", // Fallback gradient
      }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Logo */}
        <img
          src="logomv.jpeg" // Ensure logomv.jpeg is in public/
          alt="Movie App Logo"
          className="h-7 sm:h-9 w-auto"
        />

        {/* Search box */}
        <div className="relative w-full max-w-[10rem] sm:max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="w-full py-1 pl-7 pr-2 bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 text-xs sm:text-sm"
            aria-label="Search movies"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </div>

      {/* Online status */}
      <div className="mt-1 text-center">
        <span
          className={`font-medium text-[0.65rem] sm:text-xs ${
            isOnline ? "text-green-400" : "text-red-400"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Welcome section */}
      <div className="mt-2 text-center bg-gray-900/80 rounded-lg p-2 sm:p-3 max-w-md mx-auto">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
          Welcome to Movie App for{" "}
        </h1>
        <span className="text-emerald-700 shadow-2xl">Bukira Sophonie</span>
        <p className="mt-1 text-[0.65rem] sm:text-xs md:text-sm text-gray-300">
          Discover your favorite movies and shows
        </p>
      </div>
    </header>
  );
}
