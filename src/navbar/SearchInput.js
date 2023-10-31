import React from 'react'

const SearchInput = ({type, placeholder, value, onChange}) => {
  return (
    <input
    className="search"
    type={type || 'text'}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
  )
}

export default SearchInput