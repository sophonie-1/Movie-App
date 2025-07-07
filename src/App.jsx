import React, { useEffect } from "react";
import HeaderMovie from "./components/Header";
import { useState } from "react";
import { Columns2Icon } from "lucide-react";
import MovieCard from "./components/MovieCard";
import { useNetworkState, useDebounce } from "react-use";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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
  const [debouncedSearch, setdebouncedSearch] = useState("");

  useDebounce(() => setdebouncedSearch(search), 500, [search]);

  const fetchMovie = async (query) => {
    setLoading(true);

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?/sort_by*populality.desc`;
      const response = await fetch(endpoint, API_OPTION);
      if (!response.ok) {
        throw new Error("failed to fetch movies");
      }
      const data = await response.json();

      setMovie(data.results);
      setLoading(false);
    } catch (error) {
      console.log(console.error(error));
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovie(debouncedSearch);
  }, [debouncedSearch]);
  return (
    <>
      <HeaderMovie
        searc={search}
        setSearch={setSearch}
        isonline={isOnline.online}
      />
      <main className="p-4">
        <p className="text-red-500 text-center">{errorMessage}</p>
        {!loading ? (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movie.map((movie) => (
              <MovieCard
                key={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                year={movie.release_date}
              />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">loading......</p>
        )}
      </main>
    </>
  );
}

export default App;
