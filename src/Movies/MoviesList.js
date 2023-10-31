import React from 'react';
import Movie from './Movie'

const MoviesList = ({movies, onSelectedId}) => {
  return (
    <ul className="list list-movies">
              {movies.length > 0 && movies.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} onSelectedId={onSelectedId}/>
              ))}
            </ul>
  )
}

export default MoviesList