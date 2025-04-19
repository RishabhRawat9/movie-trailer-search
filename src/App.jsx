import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "./App.css";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";
import { Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";

function App() {
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    // synchronize the histroy after the reload, effect runs even when the page reloads.
    const userHistory = localStorage.getItem("history");
    if (userHistory) {
      const userHistoryData = JSON.parse(userHistory);
      setHistory(userHistoryData.temp);
      console.log(userHistoryData.temp);
    }
  }, []);

  return (
    <div>
      <nav className=" bg-black z-50 sticky top-0">
        <ul>
          <li>
            <div className="flex flex-row items-center w-screen p-5 gap-1 ">
              <div>hello world</div>
              <p>this is the movie search trailer app</p>
              <SearchBar
                movieDetails={movieDetails}
                setMovieDetails={setMovieDetails}
                movieData={movieData}
                setMovieData={setMovieData}
                history={history}
                setHistory={setHistory}
                ref={inputRef}
              />
            </div>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/movie/:id"
          element={
            <MovieDetails
              movieDetails={movieDetails}
              setMovieDetails={setMovieDetails}
            />
          }
        />
      </Routes>

      <div className="grid grid-cols-4">
        {movieData.length !== 0 ? (
          movieData.map((el, key) => {
            return (
              <MovieCard
                key={key}
                title={el.title}
                poster_path={el.poster_path}
                overview={el.overview}
                id={el.id}
              />
            );
          })
        ) : (
          <p>no data</p>
        )}
      </div>
    </div>
  );
}

export default App;
