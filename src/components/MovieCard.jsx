import React from "react";

const MovieCard = ({ title, imageUrl, year, className }) => {
  return (
    <li
      className={`bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl ${className}`}
    >
      <img
        src={
          imageUrl
            ? `https://image.tmdb.org/t/p/w500${imageUrl}`
            : "/noImage.png"
        }
        alt={title || "Movie poster"}
        className="w-full h-64 sm:h-72 md:h-80 object-cover"
      />
      <div className="p-4">
        <h2 className="text-white text-base sm:text-lg font-semibold truncate">
          {title || "Untitled"}
        </h2>
        {year && (
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            {year.substring(0, 4) || "N/A"}
          </p>
        )}
      </div>
    </li>
  );
};

export default MovieCard;
