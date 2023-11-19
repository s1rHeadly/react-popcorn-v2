import React from 'react';
import WatchedMovie from './WatchedMovie';

const WatchedList = ({watchedMovies, onFilter }) => {
 
  return (
    <ul className="list">
                {watchedMovies?.map((movie) => (
                  <WatchedMovie movie={movie} key={movie.imdbID} onFilter={onFilter}/>
                ))}
              </ul>
  )
}

export default WatchedList;