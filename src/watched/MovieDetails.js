import React, { useEffect, useState } from "react";
import Loader from "../global/Loader";
import { APIKEY } from "../utils/helpers";



const MovieDetails = ({ onCloseMovie, selectedMovieId, onAddWatchedMovie }) => {

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovieData = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${selectedMovieId}&apikey=${APIKEY}`
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();
        
        console.log(selectedMovieId)

        setMovie(data);
        setLoading(false);
        //  console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    getMovieData();
  }, [selectedMovieId]);


  console.log(movie)

  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                ⭐️<span>{movie.imdbRating} IMBd Rating</span>
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <button
              className="btn-add"
              onClick={() => onAddWatchedMovie(movie)}
            >
              {" "}
              + Add to list
            </button>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Actors: {movie.Actors}</p>
            <p>Directed by: {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
