import React from 'react';
import WatchedMovie from './WatchedMovie';

const WatchedList = ({watchedMovies}) => {
 
  return (
    <ul className="list">
                {watchedMovies?.map((movie) => (
                  <WatchedMovie movie={movie} key={movie.Title}/>
                ))}
              </ul>
  )
}

export default WatchedList;