import { useEffect, useState } from "react";
import React from "react";
import MovieCard from "./MovieCard";

//whenever the user scrolls check if i am on popular page if i am on popular page then check if we are at the bottom,
//if we are at the bottom then make another request to get a new page.
function Popular() {
  const [popularData, setPopularData] = useState([]);
  const [isPopular, setisPopular] = useState(true);
  const [page, setPage] = useState(1);
  const height = window.innerHeight;
  //through the event listener we check if the user has scrolled at the bottom of the screen.
  // add the event listener on window for the scroll event inside the effect that runs when the component mounts.

  useEffect(() => {
    //for now let's just forget avout scroll and just add a btn at the bottom to load more data.
    getPopularMovies();
  }, []);
  function loadPage() {
    getPopularMovies(); //now when this triggers the popularData state is then refreshed ot
    //the new page data data however i don't want that i want when i click the new page data
    //just appends to my old page data.
  }
  function getPopularMovies() {
    const url = `http://localhost:8080/api/popular/${page}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.results && data.results.length > 0) {
          setPopularData((prevData) => [...prevData, ...data.results]);
          setPage((prev) => prev + 1);
        }
      })
      .catch((e) => console.log(e));
  }
  //if i just add more movies to the popular data that and my map would just render a moviecard for
  //each then that doesn't make a lot of sense , cause the data that is already loaded doesn't need to ve affected
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-items-center">
      {popularData ? (
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
          LOADING!
        </p>
      )}
      <button onClick={loadPage}>Load</button>
    </div>
  );
}

export default Popular;
