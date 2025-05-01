import React, { useState, useEffect, useRef } from "react";
import { forwardRef } from "react";
const auth = import.meta.env.VITE_API_AUTH;
import { Link } from "react-router-dom";
//store search history in local storage.
//like whatever the user searched cache that data in local storage.
//if the movie name is in history then the movie is already cached so no need to make another request.

//add more features to card like rating release year,etc.
const SearchBar = forwardRef((props, inputRef) => {
  const {
    movieData,
    setMovieData,
    history,
    setHistory,
    movieDetails,
    currentPage,
    setCurrentPage,
    setMovieDetails,
    totalPage,
    setTotalPage,
    searchText,
    setSearchText,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  function fetchMovies(searchText) {
    let temp = [searchText, ...history];
    setHistory(temp);
    localStorage.setItem("history", JSON.stringify({ temp }));
    setCurrentPage(1);

    const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=1`;
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
        console.log(data);
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
  function handleSearch() {
    const searchTerm = String(inputRef.current.value);
    setSearchText(String(inputRef.current.value));
    console.log("Searching for:", searchTerm);

    if (searchText.trim().length !== 0) {
      if (!history.includes(searchTerm)) {
        // if it doesn't include then i want to fetch the data o/w get from ls
        fetchMovies(searchTerm);
      } else {
        const storedUserData = localStorage.getItem(searchTerm);

        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          console.log(userData);
          setMovieData(userData.results);
          console.log(userData.results.total_pages);
          setTotalPage(userData.results.total_pages);
        } else {
          console.log("User data not found in local storage");
        }
      }
    }
  }

  function clearSearch() {
    setMovieData([]);
    setHistory([]);
    setMovieDetails(null);

    setTotalPage(null);
    setCurrentPage(1);
    localStorage.clear();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setIsFocused(false);
  }

  //handle outside clicks to hide search history.
  useEffect(() => {
    //checks if the event is made inside in input or ul.
    function handleOutsideClick(event) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
        //it simply means that whatever event happened it happened
        //outside both input and ul elements.
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [inputRef, dropdownRef]);

  return (
    <>
      <div className="relative w-full max-w-xl mx-auto pt-12 pb-8">
        <div className="flex items-center space-x-3">
          <input
            type="search"
            ref={inputRef}
            placeholder="Search for a movie..."
            onFocus={() => setIsFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full flex-grow bg-gray-100 h-16 rounded-xl px-6 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
          />
          <Link to={"/search"}>
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white rounded-lg px-5 h-14 hover:bg-blue-600 transition duration-200 font-medium shadow-md"
            >
              Search
            </button>
          </Link>
          <button
            onClick={clearSearch}
            className="bg-gray-300 text-gray-700 rounded-lg px-5 h-14 hover:bg-gray-400 transition duration-200 font-medium shadow-md"
          >
            Clear
          </button>
        </div>
        <ul
          ref={dropdownRef}
          className={`bg-white border border-gray-200 rounded-lg shadow-lg  p-2 absolute w-full z-20 ${
            isFocused && history.length > 0 ? "block" : "hidden"
          }`}
          style={{ top: "100%" }}
        >
          {history.length > 0
            ? history.map((item, index) => (
                <li key={index}>
                  {" "}
                  <button
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = item;
                      }
                      handleSearch();
                      setIsFocused(false); //after search is amde we focus out.
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))
            : null}
        </ul>
      </div>
    </>
  );
});

export default SearchBar;
