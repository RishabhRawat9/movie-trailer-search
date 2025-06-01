import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const auth = import.meta.env.VITE_API_AUTH;

function MovieDetails(props) {
  const { id } = useParams(); //gets the variable in the url
  //here it's the movie id
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const movieDetails = movieStore((state) => state.movieDetails);
  const setMovieDetails = movieStore((state) => state.setMovieDetails);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: auth,
          },
        };

        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
          options
        );
        const videoData = await videoResponse.json();
        const trailerVideo = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailerVideo) {
          setTrailer(trailerVideo.key);
        } else {
          setTrailer(null);
          console.log("trailer not available");
        }

        const detailsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          options
        );
        const detailsData = await detailsResponse.json();
        setMovieDetails(detailsData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }
  function handleClose() {
    navigate("/");
    setMovieDetails(null);
    setTrailer(null);
  }

  return (
    <div className="bg-blue-900 p-10">
      <h2 className="">{movieDetails.title}</h2>
      {trailer ? (
        <div className="flex align-middle justify-center">
          <iframe
            className="w-full"
            height="550"
            src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
            title={`${movieDetails.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>No trailer available</p>
      )}
      <div className="flex flex-col align-middle justify-evenly">
        <p>{movieDetails.overview}</p>
        <p>Release Date: {movieDetails.release_date}</p>
        <p>Rating: {movieDetails.vote_average}/10</p>
        <div className="flex justify-center w-full ">
          <button
            className="border-amber-50 bg-red-500 px-4 py rounded"
            onClick={handleClose}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
