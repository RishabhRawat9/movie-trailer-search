import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const auth = import.meta.env.VITE_API_AUTH;

function MovieDetails(props) {
  const { id } = useParams(); //gets the variable in the url
  //here it's the movie id

  const [trailer, setTrailer] = useState(null);
  const { movieDetails, setMovieDetails } = props;
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
      <div className="flex flex-col align-middle justify-center">
        <p>{movieDetails.overview}</p>
        <p>Release Date: {movieDetails.release_date}</p>
        <p>Rating: {movieDetails.vote_average}/10</p>
      </div>
    </div>
  );
}

export default MovieDetails;
