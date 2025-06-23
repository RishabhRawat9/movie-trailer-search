import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import MovieCard from "./Components/MovieCard";
import SearchBar from "./Components/SearchBar";
import { Routes, Route, Link } from "react-router-dom";
import MovieDetails from "./Components/MovieDetails";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Popular from "./Components/Popular";
import movieStore from "./store/MovieStore";
import Signup from "./Components/Signup";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Lists from "./Components/Lists";

// import ShowList from "./Components/ShowList";

//for home page implement infinite scroll, and for search pages implement pagination.

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
); //for mobile view.
function App() {
  const inputRef = useRef(null);
  const [history, setHistory] = useState([]); //keep same.

  const totalPage = movieStore((state) => state.totalPage);

  const movieData = movieStore((state) => state.movieData);
  const loggedIn = movieStore((state) => state.loggedIn);
  const setLoggedIn = movieStore((state) => state.setLoggedIn);

  const currentPage = movieStore((state) => state.currentPage);
  const setCurrentPage = movieStore((state) => state.setCurrentPage);

  const fetchMoviesPage = movieStore((state) => state.fetchMoviesPage);

  //error - > from home page ("/") go to search search for soemthing then go to home again the popular movies don't come.fix it
  //nothing happens the request isn't going.
  useEffect(() => {
    //lloads up the history
    const userHistory = localStorage.getItem("history");
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === true) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
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

  function handlePageChange(event, page) {
    setCurrentPage(page);
    fetchMoviesPage(page);
  }

  return (
    <div>
      <main className="flex-1 pt-16">
        <Navbar />
        <Routes>
          <Route path="/" element={<Popular />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lists" element={<Lists />} />
          {/* <Route path="/lists/:id" element={<ShowList />} /> */}

          <Route
            path="/home"
            element={
              <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
                <SearchBar
                  history={history}
                  setHistory={setHistory}
                  ref={inputRef}
                />
              </div>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <div className="p-4 md:p-6">
                <MovieDetails />
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
                        />
                      );
                    })
                  ) : (
                    <p className="col-span-1 xs:col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center text-gray-500 py-10 text-lg">
                      LOADING!
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
                    {/* media queries. */}
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
      </main>
    </div>
  );
}

export default App;
