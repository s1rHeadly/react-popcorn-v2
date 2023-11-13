import React from 'react';
import WatchedMovie from './WatchedMovie';

const WatchedList = ({watchedMovies}) => {
 
  return (
    <ul className="list">
                {watchedMovies?.map((movie) => (
                  <WatchedMovie movie={movie} key={movie.imdbID}/>
                ))}
              </ul>
  )
}

export default WatchedList;