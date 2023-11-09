import React from 'react'

const Movie = ({movie, onSelectedId}) => {
  const {title, poster, id, year} = movie

  return (
    <li onClick={() => onSelectedId(id)}>
    <img src={poster} alt={`${title} poster`} />
    <h3>{title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{year}</span>
      </p>
    </div>
  </li>
  )
}

export default Movie