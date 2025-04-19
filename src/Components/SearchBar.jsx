import React, { useState, useEffect, useRef } from "react";
import { forwardRef } from "react";
const auth = import.meta.env.VITE_API_AUTH;
//store search history in local storage.
//like whatever the user searched cache that data in local storage.
//if the movie name is in history then the movie is already cached so no need to make another request.

const SearchBar = forwardRef((props, inputRef) => {
  const {
    movieData,
    setMovieData,
    history,
    setHistory,
    movieDetails,
    setMovieDetails,
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);

  function handleSearch() {
    const searchText = String(inputRef.current.value);
    console.log("Searching for:", searchText);

    if (searchText.trim().length !== 0) {
      if (!history.includes(searchText)) {
        // if it doesn't include then i want to fetch the data o/w get from ls
        let temp = [searchText, ...history];
        setHistory(temp);
        localStorage.setItem("history", JSON.stringify({ temp }));

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
            console.log(data.results);
            setMovieData(data.results);
            let results = data.results;
            localStorage.setItem(searchText, JSON.stringify({ results }));
          })
          .catch((e) => {
            console.error("Fetch error:", e);
            setMovieData([]);
          });
      } else {
        const storedUserData = localStorage.getItem(searchText);
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          console.log(userData.results);
          setMovieData(userData.results);
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
      <div className="relative w-full max-w-md mx-auto">
        {" "}
        <div className="flex items-center space-x-2">
          {" "}
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
            className="flex-grow bg-gray-100 h-10 rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded-lg px-4 h-10 hover:bg-blue-600 transition duration-200"
          >
            Search
          </button>
          <button
            onClick={clearSearch}
            className="bg-gray-300 text-gray-700 rounded-lg px-4 h-10 hover:bg-gray-400 transition duration-200"
          >
            Clear
          </button>
        </div>
        <ul
          ref={dropdownRef}
          className={`bg-white border border-gray-200 rounded-lg shadow-lg mt-1 p-2 absolute w-full z-20 ${
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
