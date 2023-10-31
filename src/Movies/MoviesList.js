import React from 'react';
import Movie from './Movie'

const MoviesList = ({movies}) => {
  return (
    <ul className="list">
              {movies.map((movie) => (
                <Movie movie={movie} key={movie.imdbID}/>
              ))}
            </ul>
  )
}

export default MoviesList