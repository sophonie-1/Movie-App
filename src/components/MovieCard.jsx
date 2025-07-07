import React from "react";

const MovieCard = ({ title, imageUrl, year }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden w-64">
      <img
        src={`https://image.tmdb.org/t/p/w500/${
          imageUrl ? imageUrl : "noImage.png"
        }`}
        alt={title}
        className="w-full h-96 object-cover"
      />
      <div className="p-4">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
        {year && <p className="text-gray-400 text-sm mt-1">{year}</p>}
      </div>
    </div>
  );
};

export default MovieCard;
