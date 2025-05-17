// ...existing imports...
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";
import { Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const auth = import.meta.env.VITE_API_AUTH;
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
function App() {
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [movieData, setMovieData] = useState();
  const [movieDetails, setMovieDetails] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const userHistory = localStorage.getItem("history");
    if (userHistory) {
      try {
        const userHistoryData = JSON.parse(userHistory);
        if (Array.isArray(userHistoryData?.temp)) {
          setHistory(userHistoryData.temp);
        }
      } catch (error) {
        console.error("Error parsing history from localStorage:", error);
        setHistory([]);
      }
    }
  }, []);

  function fetchMovies(searchQuery, page) {
    if (!searchQuery.trim()) {
      setMovieData({ results: [] });
      setTotalPage(0);
      return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      searchQuery
    )}&include_adult=false&language=en-US&page=${page}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: auth,
      },
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTotalPage(data.total_pages || 0);
        setMovieData(data || null);
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setMovieData();
        setTotalPage(0);
      });
  }

  function handlePageChange(event, value) {
    setCurrentPage(value);
    fetchMovies(searchText, value);
  }

  return (
    <div>
      <div>
        <nav className="bg-amber-300 z-50 sticky top-0 shadow-md">
          <ul>
            <li>
              <div className="flex flex-row sm:flex-row items-center justify-between sm:justify-around w-full p-3 sm:p-4 gap-2">
                <div className="text-lg font-semibold text-center sm:text-left">
                  Movie Trailer Search
                </div>
                <p className="text-xs sm:text-sm text-center sm:text-left px-2">
                  Find your favorite movie trailers!
                </p>
                <Link to={"/"} className="w-auto">
                  <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm flex items-center justify-center">
                    <span className="sm:hidden">
                      <SearchIcon />
                    </span>

                    <span className="hidden sm:inline">New Search</span>
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
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
                fetchMovies={fetchMovies}
              />
            </div>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <div className="p-4 md:p-6">
              <MovieDetails
                movieDetails={movieDetails}
                setMovieDetails={setMovieDetails}
              />
            </div>
          }
        />
        <Route
          path="/search"
          element={
            <div className="flex flex-col w-full p-2 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6 justify-items-center">
                {movieData &&
                movieData.results &&
                movieData.results.length > 0 ? (
                  movieData.results.map((el, idx) => {
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
                        movieData={movieData}
                      />
                    );
                  })
                ) : (
                  <p className="col-span-1 xs:col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center text-gray-500 py-10 text-lg">
                    No movies found. Try searching for something else!
                  </p>
                )}
              </div>

              {totalPage > 0 ? (
                <Stack
                  spacing={2}
                  alignItems="center"
                  className="mt-6 sm:mt-8 mb-4"
                >
                  <Pagination
                    color="primary"
                    count={totalPage}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                    size="small"
                    className="sm:hidden"
                  />
                  <Pagination
                    color="primary"
                    count={totalPage}
                    page={currentPage}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                    size="medium"
                    className="hidden sm:flex"
                  />
                </Stack>
              ) : null}
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
