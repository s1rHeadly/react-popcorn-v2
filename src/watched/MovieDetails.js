import React, { useEffect, useState } from 'react';
import Loader from '../global/Loader';
import { APIKEY } from '../utils/helpers';

const MovieDetails = ({onCloseMovie, selectedMovieId, onAddWatchedMovie}) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});

  let{
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
    imdbRating,
  } = movie;


  useEffect(() => {

   const getMovieData = async() => {
        setIsLoading(true)

        try {
          const response = await fetch(`https://www.omdbapi.com/?i=${selectedMovieId}&apikey=${APIKEY}`); 
          if(!response.ok){
            throw new Error('Something went wrong')
          }

          const data = await response.json();


          setMovie(data)
          setIsLoading(false);
         //  console.log(data)
        } catch (error) {
            console.log(error)
        }
   }

   getMovieData();
   
  }, [selectedMovieId]);

 
  return (
    <div className="details">
    {isLoading ? (
      <Loader />
    ) : (
      <>
        <header>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <img src={poster} alt={title} />
          <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p>⭐️<span>{imdbRating} IMBd Rating</span></p>
          </div>
        </header>

        {/* <p>{avgRating}</p> */}

        <section>
        <button className="btn-add" onClick={() => onAddWatchedMovie(movie)}> + Add to list</button>
          <p>
            <em>{plot}</em>
          </p>
          <p>Actors: {actors}</p>
          <p>Directed by: {director}</p>
        </section>
      </>
    )}
  </div>
  )
}

export default MovieDetails