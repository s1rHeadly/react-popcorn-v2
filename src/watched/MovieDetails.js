import React, { useEffect, useState } from 'react';
import Loader from '../global/Loader';
import { APIKEY } from '../utils/helpers';

const MovieDetails = ({onCloseMovie, selectedMovieId}) => {
  
  const [getMovie, setGetMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {

   const getMovieData = async() => {
        setIsLoading(true)
        try {
          const response = await fetch(`https://www.omdbapi.com/?i=${selectedMovieId}&apikey=${APIKEY}`); 
          if(!response.ok){
            throw new Error('Something went wrong')
          }

          const data = await response.json();
          setIsLoading(false);
          console.log(data)
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
          <img src='' alt={`Poster of movie`} />
          <div className="details-overview">
            <h2>title</h2>
            <p>
             releasaed
            </p>
            <p>genre</p>
            <p>
              <span>⭐️</span>
             IMDb rating
            </p>
          </div>
        </header>

        {/* <p>{avgRating}</p> */}

        <section>
        <button className="btn-add"> + Add to list</button>
          <p>
            <em>plot</em>
          </p>
          <p>Starring actors</p>
          <p>Directed by</p>
        </section>
      </>
    )}
  </div>
  )
}

export default MovieDetails