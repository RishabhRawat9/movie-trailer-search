import { Link } from "react-router-dom";
import movieStore from "../store/MovieStore";

function MovieCard(props) {
  // ...existing logic...
  const movieData = movieStore((state) => {
    state.movieData;
  });
  const { idx, title, poster_path, overview, id } = props;
  const popularData = movieStore((state) => state.popularData);
  const popularLoading = movieStore((state) => state.popularLoading);
  let rating, releaseYear;

  if (movieData !== undefined) {
    rating = movieData.results[idx].vote_average;
    releaseYear = movieData.results[idx].release_date;
  }

  if (popularLoading === true && popularData !== undefined) {
    rating = popularData[idx].vote_average;
    releaseYear = popularData[idx].release_date;
  }

  return (
    <Link to={`/movie/${id}`} className="w-full">
      <div
        className="group flex flex-col bg-white rounded-lg shadow-md overflow-hidden m-2 sm:m-3 w-full 
                  transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative"
      >
        <div className="relative w-full overflow-hidden h-64 sm:h-72 md:h-80 lg:h-96">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : "https://via.placeholder.com/500x750.png?text=No+Image"
            }
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-3 sm:p-4">
          <h3
            className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 truncate"
            title={title}
          >
            {title}
          </h3>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white
                     transform translate-y-full group-hover:translate-y-0 
                     transition-transform duration-300 ease-in-out p-3 sm:p-4 text-xs sm:text-sm"
        >
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="font-semibold truncate mr-2 text-sm sm:text-base">
              Movie Details
            </span>
            <span className="bg-yellow-500 text-black px-2 py-1 rounded-md font-bold shrink-0">
              {rating ? rating.toFixed(1) : "N/A"}★{" "}
            </span>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-300">Release: </span>
              <span className="font-medium truncate ml-2">
                {releaseYear ? new Date(releaseYear).getFullYear() : "N/A"}
              </span>
            </p>
          </div>

          <div className="mt-2 sm:mt-3 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 sm:px-4 rounded-full text-xs sm:text-sm font-medium w-full">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
