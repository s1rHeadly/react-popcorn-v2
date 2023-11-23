import React, { useEffect, useState } from "react";
import Loader from "../global/Loader";
import { APIKEY } from "../utils/helpers";
import StarRating from "../global/stars/StarRating";



const MovieDetails = ({ onCloseMovie, selectedMovieId, onAddWatchedMovie }) => {

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const {Title: title, Genre: genre, Poster: poster, Runtime: runtime, Plot: plot, Released: released, Actors:actors, Director: director} = movie

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
         

        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieData();
  }, [selectedMovieId]);


  return (
    <div className="details">
      {loading ? (
        <Loader message="Loading"/>
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                ⭐️<span>{movie.imdbRating} IMBd Rating</span>
              </p>
            </div>
          </header>

        

          <section>

          <StarRating />
            <button
              className="btn-add"
              onClick={() => onAddWatchedMovie(movie)}
            >
              + Add to list
            </button>
            <p>
              <em>{plot}</em>
            </p>
            <p>Actors: {actors}</p>
            <p>Directed by: {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
