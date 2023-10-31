import React from 'react'

const Error = ({message}) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  )
}

export default Error