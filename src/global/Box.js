import {useState} from 'react';

import Button from '../global/Button';


const Box = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
    
         <Button
          value={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          />

          {isOpen && (children )}

        </div>
  )
}

export default Box