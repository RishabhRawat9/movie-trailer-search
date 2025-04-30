import React from "react";
import { Link } from "react-router-dom";

function MovieCard(props) {
  const { idx, title, poster_path, overview, id, movieData } = props;
  const releaseYear = movieData.results[idx].release_date;
  const rating = movieData.results[idx].vote_average;
  return (
    <Link to={`/movie/${id}`}>
      <div
        className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[400px] w-[300px] m-5 mx-auto 
                  transition-all duration-300 hover:shadow-xl  hover:-translate-y-1 relative"
      >
        {/* img container */}
        <div className="relative h-10/12 w-full">
          <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white
                     transform translate-y-full group-hover:translate-y-1/12
                     transition-transform duration-300 ease-in-out p-5"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Movie Details</span>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-md font-bold">
              {rating}★{" "}
            </span>
          </div>

          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-300">Release Date: </span>
              <span className="font-medium">{releaseYear}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-300">Language:</span>
              <span className="font-medium">English</span>
            </p>
          </div>

          <div className="mt-3 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm font-medium w-full">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
