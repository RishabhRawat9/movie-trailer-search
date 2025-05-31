import { useEffect } from "react";
import React from "react";
import MovieCard from "./MovieCard";
import movieStore from "../store/MovieStore";

function Popular() {
  const { popularData, popularLoading, fetchPopularMovies, resetPopular } =
    movieStore();

  useEffect(() => {
    resetPopular(); //just default values.
    fetchPopularMovies(); //in the store.
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-items-center">
        {popularData.length > 0 ? (
          popularData.map((el, idx) => {
            return (
              <MovieCard
                idx={idx}
                key={el.id}
                title={el.title}
                poster_path={el.poster_path}
                overview={el.overview}
                id={el.id}
                release_date={el.release_date}
                vote_average={el.vote_average}
                popularData={popularData}
              />
            );
          })
        ) : (
          <p className="col-span-1 xs:col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center text-gray-500 py-10 text-lg">
            {popularLoading ? "LOADING!" : "No popular movies found."}
          </p>
        )}
      </div>
      <button
        onClick={fetchPopularMovies}
        disabled={popularLoading}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        {popularLoading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
}

export default Popular;
