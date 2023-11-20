import React, { useEffect, useRef } from 'react'

// const SearchInput = ({type, placeholder, value, onChange}) => {
//   return (
//     <input
//     className="search"
//     type={type || 'text'}
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//   />
//   )
// }

// export default SearchInput



// using ref on the search input to focus


const SearchInput = ({type, placeholder, value, onChange}) => {

  
  const searchInput = useRef(null)
  //search input is the object
  // current is the DOM Element

  // console.log(searchInput.current)


  //when the component is first rendered, make it focus
  // remember we cannot use searchinput.focus as this is the object!
   useEffect(() => {
      searchInput.current.focus();
   }, [])

  return (
    <input
    className="search"
    type={type || 'text'}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    ref={searchInput}
  />
  )
}

export default SearchInput