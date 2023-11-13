import React from 'react'

const WatchedMovie = ({movie}) => {


  return (
    <li>
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <p>test</p>
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
    <button className="btn-delete">ｘ</button>
  </li>
  )
}

export default WatchedMovie