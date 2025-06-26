// src/Components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import movieStore from "../store/MovieStore";

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

function Navbar() {
  const loggedIn = movieStore((state) => state.loggedIn);
  const setLoggedIn = movieStore((state) => state.setLoggedIn);
  const setMovieData = movieStore((state) => state.setMovieData);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (loggedIn === true) {
      localStorage.clear();
      setLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
    setMovieData([]);
  };

  return (
    <nav className="bg-amber-200 z-10 fixed top-0 left-0 right-0 shadow-md backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to={"/"} className="flex-shrink-0">
            <div className="text-lg font-bold text-gray-900 hover:text-amber-700 transition-colors">
              MovieSearch
            </div>
          </Link>

          <div className="hidden md:block">
            <p className="text-sm text-gray-700 font-medium">
              Find your favorite movie trailers!
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Link to={"/home"}>
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm flex items-center justify-center shadow-sm">
                <span className="sm:hidden">
                  <SearchIcon />
                </span>
                <span className="hidden sm:inline">New Search</span>
              </button>
            </Link>
            {loggedIn ? (
              <Link to={"/lists"}>
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm flex items-center justify-center shadow-sm">
                  <span className="sm:hidden">
                    <SearchIcon />
                  </span>
                  <span className="hidden sm:inline">My Lists</span>
                </button>
              </Link>
            ) : null}

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg transition-colors text-sm shadow-sm"
            >
              <span className="sm:hidden">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </span>
              <span>{loggedIn ? "LogOut" : "LogIn"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
