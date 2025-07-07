import React, { useEffect } from "react";
import HeaderMovie from "./components/Header";
import { useState } from "react";
import MovieCard from "./components/MovieCard";
import { useNetworkState, useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "YOUR_API_KEY_HERE"; // Fallback for debugging
const API_OPTION = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [search, setSearch] = useState("");
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const isOnline = useNetworkState();
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useDebounce(() => setDebouncedSearch(search), 500, [search]);

  const fetchMovie = async (query) => {
    if (!isOnline.online) {
      setErrorMessage("No internet connection");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovie(data.results || []);
      setErrorMessage("");
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage(error.message || "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <HeaderMovie
        search={search}
        setSearch={setSearch}
        isOnline={isOnline.online}
        className="sticky top-0 z-10 bg-gray-900 shadow-md py-4 px-4 sm:px-6 lg:px-8"
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {errorMessage && (
          <p className="text-center text-red-500 font-medium text-sm sm:text-base md:text-lg mb-6">
            {errorMessage}
          </p>
        )}
        {!loading ? (
          movie.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {movie.map((movie) => (
                <MovieCard
                  key={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  year={movie.release_date}
                  className="w-full"
                />
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-400 text-sm sm:text-base">
              No movies found
            </p>
          )
        ) : (
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <span>Loading...</span>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default App;
