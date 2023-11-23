import React, { useState } from 'react';
import PropTypes from 'prop-types'
import Stars from './Stars';

const StarRating = ({maxLength, defaultRating = 0}) => {

  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0)

  // styles
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };
  
  const starContainerStyle = {
    display: "flex",
  };



  const handleRating = (rating) => {
    setRating(rating)
  }


  
  return (
    <div style={containerStyle}>
    <div style={starContainerStyle}>

     
    
    {Array.from({ length: maxLength }, (_, i) => (
          <Stars
            key={i}
            size={30}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            />
        ))}

   
     
    </div>
    </div>
  )
}

StarRating.defaultProps = {
  maxLength: 10,
}

export default StarRating





