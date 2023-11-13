import React from 'react'

const WatchedMovie = ({movie}) => {

  const {poster, title, imdbRating, runtime, imdbID: id} = movie; 

  return (
    <li id={id}>
    <img src={poster} alt={`${title} poster`} />
    <h3>{title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime}</span>
      </p>
    </div>
    <button className="btn-delete">ｘ</button>
  </li>
  )
}

export default WatchedMovie