import React from 'react'

const NavResults = ({movies}) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length || 0}</strong> results
    </p>
  )
}

export default NavResults