import React, { useState } from "react";
import { Search } from "lucide-react"; // or use any search icon lib

export default function HeaderMovie({ Searc, setSearch, isonline }) {
  return (
    <header
      className="h-64 bg-cover bg-center text-green-300 px-6 py-4"
      style={{
        backgroundImage: "url('bg1.jpeg')", // Replace with your image URL
      }}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img src="logomv.jpeg" alt="Movie App Logo" className="h-10" />

        {/* Search box */}
        <div className="relative w-full max-w-md ml-auto">
          <input
            type="text"
            value={Searc}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="w-full py-2 pl-10 pr-4 bg-fuchsia-900 text-blue-500 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        {/* Online status */}
      </div>
      <div className="mt-4">
        {isonline ? (
          <span className="text-green-500 font-bold">Online</span>
        ) : (
          <span className="text-red-500 font-bold">Offline</span>
        )}
      </div>
      <div className="mt-4 text-2xl text-center field-sizing-content bg-amber-400 rounded-lg p-4 shadow-md">
        <h1 className="text-4xl font-bold">Welcome to Movie App</h1>
        <p className="mt-2 text-lg">Discover your favorite movies and shows</p>
      </div>
    </header>
  );
}
