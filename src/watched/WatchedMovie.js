import React from 'react'

const WatchedMovie = ({movie,onFilter}) => {

  const {Title: title, imdbID: id, Poster: poster, Runtime:runtime, imdbRating} = movie


  return (
    <li>
    <img src={poster} alt={`${title} poster`} />
    <h3>{title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{imdbRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{runtime}</span>
      </p>
    </div>
    <button className="btn-delete" onClick={() =>onFilter(id)}>ｘ</button>
  </li>

  )
}

export default WatchedMovie