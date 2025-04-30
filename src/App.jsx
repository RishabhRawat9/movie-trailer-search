import React, { useState, useEffect } from "react";
import { useRef } from "react";
import "./App.css";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";
import { Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const auth = import.meta.env.VITE_API_AUTH;

function App() {
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [movieData, setMovieData] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const userHistory = localStorage.getItem("history");
    if (userHistory) {
      const userHistoryData = JSON.parse(userHistory);
      setHistory(userHistoryData.temp);
      console.log(userHistoryData.temp);
    }
  }, []);

  function fetchMovies(searchText, curr) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${curr}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    };

    fetch(url, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTotalPage(data.total_pages);
        setMovieData(data);
        let results = data;
        localStorage.setItem(searchText, JSON.stringify({ results }));
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setMovieData([]);
      });
  }

  function handlePageChange(e) {
    console.log(e.target.textContent);
    setCurrentPage(e.target.textContent);
    fetchMovies(searchText, e.target.textContent);
  }
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
                setTotalPage={setTotalPage}
                searchText={searchText}
                setSearchText={setSearchText}
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

      <div className=" flex flex-col w-dvw">
        <div className="grid grid-cols-4 justify-evenly">
          {movieData && movieData.length !== 0 ? (
            movieData.results.map((el, key) => {
              return (
                <MovieCard
                  key={key}
                  idx={key}
                  title={el.title}
                  poster_path={el.poster_path}
                  overview={el.overview}
                  id={el.id}
                  movieData={movieData}
                />
              );
            })
          ) : (
            <p>no data</p>
          )}
        </div>

        {totalPage != null ? (
          <Stack spacing={2} alignSelf="center">
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </Stack>
        ) : null}
      </div>
    </div>
  );
}

export default App;
