import React from 'react'

const Button = ({value, onClick}) => {
  return (
  
    <button
    className="btn-toggle"
    onClick={onClick} >
    {value ? "–" : "+"}
  </button>
  )
}

export default Button