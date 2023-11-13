import React from 'react'

import { average } from '../utils/helpers';

const Summary = ({watched}) => {


  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                  <p>
                    <span>#️⃣</span>
                    <span>{20} movies</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{20}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{4.6}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{154} min</span>
                  </p>
                </div>
              </div>
  )
}

export default Summary