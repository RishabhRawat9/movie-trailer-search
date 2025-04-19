import React from "react";
import { Link } from "react-router-dom";

function MovieCard(props) {
  const { title, poster_path, overview, id } = props;
  return (
    <Link to={`/movie/${id}`}>
      <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-[400px] w-[300px] m-5 mx-auto">
        <div className="relative h-[250px] w-full">
          <img
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={title}
            className="w-full h-full object-cover "
          />
        </div>
        <div className="p-4 ">
          <h3 className="text-lg font-semibold mb-2 ">{title}</h3>
          <p className="text-sm text-gray-700 line-clamp-3">{overview}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
